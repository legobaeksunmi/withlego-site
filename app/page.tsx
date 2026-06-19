import Link from "next/link"
import { LogIn, User, Phone, FolderOpen, Megaphone, TriangleAlert, FileText, Newspaper, HeartHandshake } from "lucide-react"
import { LiveClock } from "@/components/live-clock"

type MenuItem = {
  label: string
  href: string
  mobileLabel?: [string, string]
  icon: React.ComponentType<{ className?: string }>
}

const menuItems: MenuItem[] = [
  { label: "출퇴근 보고", href: "/attendance", icon: LogIn },
  { label: "원수사 연락망", href: "/managers", mobileLabel: ["원수사", "연락망"], icon: User },
  { label: "보험사 연락처", href: "/insurance", mobileLabel: ["보험사", "연락처"], icon: Phone },
  { label: "자료실", href: "/resources", icon: FolderOpen },
  { label: "공지사항", href: "/notices", icon: Megaphone },
  { label: "오류 보고", href: "/errors", icon: TriangleAlert },
]

const shortcuts = [
  {
    label: "본부통합시트",
    href: "https://docs.google.com/spreadsheets/d/1gCNehUY2lE2x69hCB2iWqBR0V4ER7ww93lEHPfbzomI/edit?gid=1879501890",
    icon: FileText,
  },
  {
    label: "소식지",
    href: "https://drive.google.com/drive/folders/1wiQ_GZf44VjQpvY0MdNfAXbY8CSyN8N2",
    icon: Newspaper,
  },
  {
    label: "보케어",
    href: "https://bocare.co.kr/",
    icon: HeartHandshake,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-rose-50/30">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">보험상담소</h1>
          <p className="text-rose-400 text-sm font-medium">Let&apos;s go with LEGO</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 transition-all h-[88px] md:h-[96px] flex items-center cursor-pointer hover:shadow-md hover:border-rose-200 active:scale-[0.98]"
              >
                <div className="flex gap-3 items-center w-full">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-rose-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-tight text-center md:text-left">
                        {item.mobileLabel ? (
                          <>
                            <span className="hidden md:inline">{item.label}</span>
                            <span className="md:hidden leading-[1.3]">
                              {item.mobileLabel[0]}
                              <br />
                              {item.mobileLabel[1]}
                            </span>
                          </>
                        ) : (
                          item.label
                        )}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="rounded-2xl p-4 flex flex-col items-start justify-center mt-2">
          <p className="text-xs text-gray-400 mb-2">바로가기</p>
          <div className="flex flex-wrap gap-2">
            {shortcuts.map((shortcut) => {
              const Icon = shortcut.icon
              return (
                <a
                  key={shortcut.label}
                  href={shortcut.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-100 text-xs text-gray-600 hover:border-rose-200 hover:bg-rose-50 transition-colors whitespace-nowrap"
                >
                  <Icon className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                  <span>{shortcut.label}</span>
                </a>
              )
            })}
          </div>
        </div>

        <LiveClock />
      </div>
    </main>
  )
}
