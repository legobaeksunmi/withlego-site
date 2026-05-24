import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  let query = supabase
    .from("attendance_reports")
    .select("*")
    .order("created_at", { ascending: false })

  if (type) {
    query = query.eq("type", type)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("attendance_reports")
    .insert({
      type: body.type,
      jeong1: body.jeong1 || "",
      jeong2: body.jeong2 || "",
      daily_reservation: body.dailyReservation || "",
      daily_work: body.dailyWork || "",
      gift_management: body.giftManagement || "",
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("attendance_reports")
    .update({
      type: body.type,
      jeong1: body.jeong1 || "",
      jeong2: body.jeong2 || "",
      daily_reservation: body.dailyReservation || "",
      daily_work: body.dailyWork || "",
      gift_management: body.giftManagement || "",
      is_edited: true,
    })
    .eq("id", body.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("attendance_reports")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
