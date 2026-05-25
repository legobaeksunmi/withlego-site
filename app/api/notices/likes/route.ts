import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const noticeId = searchParams.get("noticeId")

  if (!noticeId) {
    return NextResponse.json({ error: "Notice ID is required" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("notice_likes")
    .select("*")
    .eq("notice_id", noticeId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data: existing } = await supabase
    .from("notice_likes")
    .select("id")
    .eq("notice_id", body.noticeId)
    .eq("user_id", body.userId || "anonymous")
    .single()

  if (existing) {
    const { error } = await supabase
      .from("notice_likes")
      .delete()
      .eq("id", existing.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ action: "unliked" })
  }

  const { data, error } = await supabase
    .from("notice_likes")
    .insert({
      notice_id: body.noticeId,
      user_id: body.userId || "anonymous",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ action: "liked", data })
}
