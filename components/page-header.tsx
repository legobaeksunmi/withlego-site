import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export function PageHeader({
  title,
  action,
}: {
  title: string
  action?: React.ReactNode
}) {
  return (
    <header className="sticky top-0 z-20 bg-rose-50/80 backdrop-blur-sm border-b border-rose-100">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-rose-500 transition-colors -ml-1 pr-2 py-1"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>돌아가기</span>
        </Link>
        <h1 className="flex-1 text-center font-bold text-gray-800 text-base md:text-lg truncate">{title}</h1>
        <div className="min-w-[64px] flex justify-end">{action}</div>
      </div>
    </header>
  )
}
