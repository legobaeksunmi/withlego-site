import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("resource_categories")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("resource_categories")
    .insert({ name: body.name })
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

  // 순서 변경: categories 배열의 순서대로 sort_order 업데이트
  if (body.reorder && Array.isArray(body.categories)) {
    const updates = body.categories.map((id: number, index: number) => 
      supabase
        .from("resource_categories")
        .update({ sort_order: index })
        .eq("id", id)
    )
    
    await Promise.all(updates)
    return NextResponse.json({ success: true })
  }

  // 카테고리 이름 수정
  if (body.id && body.name) {
    const { data, error } = await supabase
      .from("resource_categories")
      .update({ name: body.name })
      .eq("id", body.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 })
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("resource_categories")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
