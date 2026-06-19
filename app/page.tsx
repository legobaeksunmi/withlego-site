import { LogIn, User, Phone, FolderOpen, Megaphone, FileText, Newspaper, HeartHandshake, ExternalLink } from "lucide-react"
import { LiveClock } from "@/components/live-clock"

type MenuItem = {
  label: string
  mobileLabel?: [string, string]
  icon: React.ComponentType<{ className?: string }>
}

const menuItems: MenuItem[] = [
  { label: "출퇴근 보고", icon: LogIn },
  { label: "원수사 연락망", mobileLabel: ["원수사", "연락망"], icon: User },
  { label: "보험사 연락처", mobileLabel: ["보험사", "연락처"], icon: Phone },
  { label: "자료실", icon: FolderOpen },
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
              <div
                key={item.label}
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
              </div>
            )
          })}

          <div className="flex flex-col gap-3 md:gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 transition-all h-[88px] md:h-[96px] flex items-center cursor-pointer hover:shadow-md hover:border-rose-200 active:scale-[0.98]">
              <div className="flex gap-3 items-center w-full">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <Megaphone className="h-5 w-5 text-rose-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-tight">공지사항</h3>
                </div>
              </div>
            </div>
            <LiveClock />
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 transition-all flex flex-col cursor-default">
            <div className="flex gap-3 items-center w-full mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="h-5 w-5 text-rose-400" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-tight">바로가기</h3>
            </div>
            <div className="flex flex-col gap-2">
              {shortcuts.map((shortcut) => {
                const Icon = shortcut.icon
                return (
                  <a
                    key={shortcut.label}
                    href={shortcut.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 text-xs md:text-sm text-gray-700 hover:bg-rose-100 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-rose-400 shrink-0" />
                    <span className="flex-1">{shortcut.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
