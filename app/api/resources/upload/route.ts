import { createStorageClient } from "@/lib/supabase/storage"
import { NextResponse } from "next/server"

// 허용된 파일 확장자
const ALLOWED_EXTENSIONS = [
  ".pdf", ".jpg", ".jpeg", ".png", ".webp", ".gif",
  ".xlsx", ".xls", ".docx", ".doc", 
  ".pptx", ".ppt", ".hwp", ".hwpx"
]

export async function POST(request: Request) {
  try {
    // 환경변수 확인
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("[v0] Supabase 환경변수 누락")
      return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 })
    }
    
    // Supabase Storage 클라이언트 생성
    const supabase = createStorageClient()
    
    const formData = await request.formData()
    const file = formData.get("file") as File
    
    // 파일 검증
    if (!file) {
      return NextResponse.json({ error: "파일이 제공되지 않았습니다." }, { status: 400 })
    }
    
    if (!file.size || file.size === 0) {
      return NextResponse.json({ error: "빈 파일은 업로드할 수 없습니다." }, { status: 400 })
    }
    
    console.log("[v0] File:", file.name, "Size:", file.size, "Type:", file.type)

    // 파일 확장자 검증
    const fileExt = "." + file.name.split(".").pop()?.toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return NextResponse.json({ 
        error: "허용되지 않는 파일 형식입니다. (PDF, JPG, PNG, WEBP, GIF, XLSX, DOCX, PPTX, HWP, HWPX만 가능)" 
      }, { status: 400 })
    }

    // 파일명 생성 (타임스탬프 + 안전한 파일명)
    const timestamp = Date.now()
    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const filePath = `${timestamp}-${safeFileName}`
    
    // ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    
    // 파일 업로드 (bucket: resources, path: filePath)
    const { data, error } = await supabase.storage
      .from("resources")
      .upload(filePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false
      })

    if (error) {
      console.error("[v0] Upload error:", error)
      return NextResponse.json({ 
        error: `업로드 실패: ${error.message}` 
      }, { status: 500 })
    }

    // Signed URL 생성 (1년 유효)
    const { data: signedData, error: signedError } = await supabase.storage
      .from("resources")
      .createSignedUrl(filePath, 60 * 60 * 24 * 365)

    if (signedError || !signedData?.signedUrl) {
      // Signed URL 실패 시 public URL 시도
      const { data: urlData } = supabase.storage
        .from("resources")
        .getPublicUrl(filePath)
      
      return NextResponse.json({
        fileName: file.name,
        fileUrl: urlData.publicUrl,
        path: data.path,
        success: true
      })
    }

    return NextResponse.json({
      fileName: file.name,
      fileUrl: signedData.signedUrl,
      path: data.path,
      success: true
    })
  } catch (err) {
    console.error("[v0] Upload catch error:", err)
    return NextResponse.json({ 
      error: `서버 오류: ${err instanceof Error ? err.message : "알 수 없는 오류"}` 
    }, { status: 500 })
  }
}
