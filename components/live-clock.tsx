"use client"

import { useEffect, useState } from "react"

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"]

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = WEEKDAYS[date.getDay()]
  return `${year}년 ${month}월 ${day}일 [${weekday}]`
}

function formatTime(date: Date) {
  const hours24 = date.getHours()
  const minutes = date.getMinutes()
  const meridiem = hours24 < 12 ? "오전" : "오후"
  let hours12 = hours24 % 12
  if (hours12 === 0) hours12 = 12
  const paddedMinutes = String(minutes).padStart(2, "0")
  return `${meridiem} ${hours12}시 ${paddedMinutes}분`
}

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 transition-all h-[88px] md:h-[96px] flex flex-col justify-center cursor-default"
      suppressHydrationWarning
    >
      <p className="font-bold text-gray-900 text-sm md:text-base leading-tight">Today 💕</p>
      <p className="text-xs md:text-sm font-medium text-rose-400 leading-tight mt-1">{now ? formatDate(now) : ""}</p>
      <p className="text-xs md:text-sm font-medium text-rose-400 leading-tight">{now ? formatTime(now) : ""}</p>
    </div>
  )
}
