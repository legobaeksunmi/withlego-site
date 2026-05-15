import Link from "next/link";

export default function Reservations() {
  return (
    <main className="min-h-screen bg-[#fffafa] px-4 py-6">
      <Link href="/" className="rounded-xl border bg-white px-3 py-2">← 뒤로</Link>
      <section className="mx-auto mt-6 max-w-4xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-rose-100">
        <h1 className="text-2xl font-black">예약현황 달력으로 보기</h1>
        <p className="mt-1 text-sm text-slate-500">예약자명 · 상담시간 · 담당 팀장 · 메모를 달력 형태로 확인합니다.</p>
        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-sm">
          {["일","월","화","수","목","금","토"].map(d => <div key={d} className="font-black text-rose-400">{d}</div>)}
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="min-h-24 rounded-2xl border border-rose-100 bg-rose-50/30 p-2 text-left">
              <span className="font-bold">{i + 1 <= 31 ? i + 1 : ""}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
