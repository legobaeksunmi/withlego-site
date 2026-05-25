import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// 지점장/부지점장 목록 조회
export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const companyId = searchParams.get("companyId")

  let query = supabase.from("branch_managers").select("*").order("role", { ascending: true }).order("created_at", { ascending: true })
  
  if (companyId) {
    query = query.eq("company_id", companyId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 지점장/부지점장 추가
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("branch_managers")
    .insert({
      company_id: body.companyId,
      name: body.name,
      phone: body.phone,
      role: body.role || "branch_manager"
    })
    .select()
    .single()

  if (error) {
    console.error("Branch manager insert error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 지점장/부지점장 수정
export async function PUT(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("branch_managers")
    .update({
      name: body.name,
      phone: body.phone,
      role: body.role
    })
    .eq("id", body.id)
    .select()
    .single()

  if (error) {
    console.error("Branch manager update error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 지점장/부지점장 삭제
export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("branch_managers")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Branch manager delete error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
