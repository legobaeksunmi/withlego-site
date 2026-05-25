import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const reportId = searchParams.get("reportId")

  if (!reportId) {
    return NextResponse.json({ error: "Report ID is required" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("attendance_likes")
    .select("*")
    .eq("report_id", reportId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  // 이미 공감했는지 확인
  const { data: existing } = await supabase
    .from("attendance_likes")
    .select("id")
    .eq("report_id", body.reportId)
    .eq("user_id", body.userId || "anonymous")
    .single()

  if (existing) {
    // 이미 공감한 경우 -> 공감 취소
    const { error } = await supabase
      .from("attendance_likes")
      .delete()
      .eq("id", existing.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ action: "unliked" })
  }

  // 새 공감
  const { data, error } = await supabase
    .from("attendance_likes")
    .insert({
      report_id: body.reportId,
      user_id: body.userId || "anonymous",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ action: "liked", data })
}
