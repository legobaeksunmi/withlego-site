import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const formData = await request.formData()
    const file = formData.get("file") as File
    const insuranceId = formData.get("insuranceId") as string

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다" }, { status: 400 })
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${insuranceId || Date.now()}-${Date.now()}.${fileExt}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("insurance-logos")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      })

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("insurance-logos")
      .getPublicUrl(fileName)

    return NextResponse.json({ 
      url: urlData.publicUrl,
      path: uploadData.path 
    })
  } catch (error) {
    console.error("Error uploading logo:", error)
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 })
  }
}
