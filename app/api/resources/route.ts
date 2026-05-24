import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET - 자료 목록 조회
export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  
  let query = supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (category && category !== "전체") {
    query = query.eq("category", category)
  }
  
  const { data, error } = await query
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

// POST - 새 자료 추가
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  
  const { data, error } = await supabase
    .from("resources")
    .insert({
      title: body.title,
      category: body.category || "",
      description: body.description || "",
      file_url: body.fileUrl || "",
      file_name: body.fileName || "",
      link_url: body.linkUrl || ""
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

// PUT - 자료 수정
export async function PUT(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  
  const { data, error } = await supabase
    .from("resources")
    .update({
      title: body.title,
      category: body.category || "",
      description: body.description || "",
      file_url: body.fileUrl || "",
      file_name: body.fileName || "",
      link_url: body.linkUrl || "",
      updated_at: new Date().toISOString()
    })
    .eq("id", body.id)
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

// DELETE - 자료 삭제
export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }
  
  const { error } = await supabase
    .from("resources")
    .delete()
    .eq("id", id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}
