"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import { Search, Pencil, Trash2, X, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { PageHeader } from "@/components/page-header"

type Report = {
  id: number
  type: string
  jeong1: string | null
  jeong2: string | null
  daily_reservation: string | null
  daily_work: string | null
  gift_management: string | null
  is_edited: boolean | null
  created_at: string
}

const supabase = createClient()

const fetcher = async (): Promise<Report[]> => {
  const { data, error } = await supabase
    .from("attendance_reports")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return (data ?? []) as Report[]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

const EMPTY = {
  type: "출근",
  jeong1: "",
  jeong2: "",
  daily_reservation: "",
  daily_work: "",
  gift_management: "",
}

export function AttendanceBoard() {
  const { data: reports, isLoading, mutate } = useSWR("attendance_reports", fetcher)
  const [query, setQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() => {
    if (!reports) return []
    const q = query.trim().toLowerCase()
    if (!q) return reports
    return reports.filter((r) =>
      [r.jeong1, r.jeong2, r.daily_reservation, r.daily_work, r.gift_management, r.type, formatDate(r.created_at)]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    )
  }, [reports, query])

  function openNew() {
    setEditingId(null)
    setForm({ ...EMPTY })
    setModalOpen(true)
  }

  function openEdit(r: Report) {
    setEditingId(r.id)
    setForm({
      type: r.type || "출근",
      jeong1: r.jeong1 ?? "",
      jeong2: r.jeong2 ?? "",
      daily_reservation: r.daily_reservation ?? "",
      daily_work: r.daily_work ?? "",
      gift_management: r.gift_management ?? "",
    })
    setModalOpen(true)
  }

  async function save() {
    setSaving(true)
    const payload = {
      type: form.type,
      jeong1: form.jeong1 || null,
      jeong2: form.jeong2 || null,
      daily_reservation: form.daily_reservation || null,
      daily_work: form.daily_work || null,
      gift_management: form.gift_management || null,
    }
    if (editingId) {
      await supabase.from("attendance_reports").update({ ...payload, is_edited: true }).eq("id", editingId)
    } else {
      await supabase.from("attendance_reports").insert(payload)
    }
    setSaving(false)
    setModalOpen(false)
    mutate()
  }

  async function remove(id: number) {
    if (!confirm("이 보고를 삭제할까요?")) return
    await supabase.from("attendance_reports").delete().eq("id", id)
    mutate()
  }

  return (
    <main className="min-h-screen bg-rose-50/30 pb-24">
      <PageHeader
        title="출퇴근 보고"
        action={
          <button
            onClick={openNew}
            className="inline-flex items-center gap-1 rounded-full bg-rose-400 text-white text-xs font-semibold px-3 py-1.5 hover:bg-rose-500 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            글쓰기
          </button>
        }
      />

      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="작성자, 보고내용, 날짜 검색"
            className="w-full rounded-xl border border-rose-100 bg-white pl-9 pr-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>

        <h2 className="text-sm font-semibold text-gray-500 mb-3 px-1">출퇴근 보고 게시판</h2>

        {isLoading ? (
          <p className="text-center text-sm text-gray-400 py-12">불러오는 중...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-12">보고 내용이 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((r) => (
              <article key={r.id} className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{formatDate(r.created_at)}</span>
                    {r.is_edited && <span className="text-[11px] text-gray-400">(수정됨)</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(r)}
                      aria-label="수정"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(r.id)}
                      aria-label="삭제"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div
                  className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md mb-2 ${
                    r.type === "퇴근" ? "bg-sky-50 text-sky-500" : "bg-rose-50 text-rose-500"
                  }`}
                >
                  [{r.type} 보고]
                </div>
                <dl className="text-sm text-gray-700 space-y-1">
                  <Row label="정1" value={r.jeong1} />
                  <Row label="정2" value={r.jeong2} />
                  <Row label="당일 예약" value={r.daily_reservation} />
                  <Row label="당일 근무 내용" value={r.daily_work} />
                  <Row label="사은품 관리" value={r.gift_management} />
                </dl>
              </article>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-end md:items-center justify-center bg-black/30 p-0 md:p-4">
          <div className="w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">출퇴근 보고 작성</h2>
              <button onClick={() => setModalOpen(false)} aria-label="닫기" className="p-1 text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <label className="block text-sm font-medium text-gray-600 mb-1.5">보고 유형</label>
            <div className="flex gap-2 mb-4">
              {["출근", "퇴근"].map((t) => (
                <button
                  key={t}
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                  className={`flex-1 rounded-xl py-2 text-sm font-semibold border transition-colors ${
                    form.type === t
                      ? "bg-rose-400 text-white border-rose-400"
                      : "bg-white text-gray-600 border-rose-100 hover:border-rose-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <Field label="정1" value={form.jeong1} onChange={(v) => setForm((f) => ({ ...f, jeong1: v }))} />
            <Field label="정2" value={form.jeong2} onChange={(v) => setForm((f) => ({ ...f, jeong2: v }))} />
            <Field
              label="당일 예약"
              value={form.daily_reservation}
              onChange={(v) => setForm((f) => ({ ...f, daily_reservation: v }))}
            />
            <Field
              label="당일 근무 내용"
              value={form.daily_work}
              onChange={(v) => setForm((f) => ({ ...f, daily_work: v }))}
              textarea
            />
            <Field
              label="사은품 관리"
              value={form.gift_management}
              onChange={(v) => setForm((f) => ({ ...f, gift_management: v }))}
            />

            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 rounded-xl border border-rose-100 py-2.5 text-sm font-semibold text-gray-600 hover:bg-rose-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 rounded-xl bg-rose-400 py-2.5 text-sm font-semibold text-white hover:bg-rose-500 transition-colors disabled:opacity-60"
              >
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex gap-2">
      <dt className="text-gray-400 shrink-0">{label}:</dt>
      <dd className="text-gray-700 whitespace-pre-wrap break-words">{value || "-"}</dd>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
}) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-rose-100 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-200"
        />
      )}
    </div>
  )
}
