import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// 보험사 목록 조회
export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("insurance_companies")
    .select(`
      *,
      managers:insurance_managers(id, name, phone),
      branch_managers:branch_managers(id, name, phone, role),
      education_managers:education_managers(id, name, phone)
    `)
    .order("category", { ascending: true })
    .order("name", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 보험사 추가
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("insurance_companies")
    .insert({
      name: body.name,
      category: body.category,
      logo_url: body.logoUrl,
      homepage_url: body.homepageUrl,
      customer_service: body.customerService,
      fax: body.fax,
      address: body.address,
      branch_manager_name: body.branchManagerName,
      branch_manager_phone: body.branchManagerPhone,
      computer_system_url: body.computerSystemUrl,
      incall_monitoring: body.incallMonitoring,
      claim_fax: body.claimFax,
      claim_form_url: body.claimFormUrl,
      terms_url: body.termsUrl,
      helpdesk: body.helpdesk,
      dental_form_url: body.dentalFormUrl,
      memo: body.memo
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 보험사 수정
export async function PUT(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from("insurance_companies")
    .update({
      name: body.name,
      category: body.category,
      logo_url: body.logoUrl,
      homepage_url: body.homepageUrl,
      customer_service: body.customerService,
      fax: body.fax,
      address: body.address,
      branch_manager_name: body.branchManagerName,
      branch_manager_phone: body.branchManagerPhone,
      computer_system_url: body.computerSystemUrl,
      incall_monitoring: body.incallMonitoring,
      claim_fax: body.claimFax,
      claim_form_url: body.claimFormUrl,
      terms_url: body.termsUrl,
      helpdesk: body.helpdesk,
      dental_form_url: body.dentalFormUrl,
      memo: body.memo,
      updated_at: new Date().toISOString()
    })
    .eq("id", body.id)
    .select()
    .single()

  if (error) {
    console.error("Insurance update error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// 보험사 삭제
export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  const { error } = await supabase
    .from("insurance_companies")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
