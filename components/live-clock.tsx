"use client"

import { useEffect, useState } from "react"

const WEEKDAYS = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]

function formatParts(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = WEEKDAYS[date.getDay()]
  const hours24 = date.getHours()
  const minutes = date.getMinutes()

  const meridiem = hours24 < 12 ? "오전" : "오후"
  let hours12 = hours24 % 12
  if (hours12 === 0) hours12 = 12

  const paddedMinutes = String(minutes).padStart(2, "0")

  return {
    dateLine: `${year}년 ${month}월 ${day}일 ${weekday}`,
    timeLine: `현재 시간 ${meridiem} ${hours12}시 ${paddedMinutes}분`,
  }
}

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const parts = now ? formatParts(now) : { dateLine: "", timeLine: "" }

  return (
    <div
      className="flex-1 bg-rose-50 rounded-2xl p-4 shadow-sm border border-rose-100 flex flex-col items-center justify-center text-center"
      suppressHydrationWarning
    >
      <p className="text-xs font-semibold text-rose-400 mb-1">To day 💕</p>
      <p className="text-xs md:text-sm font-medium text-gray-700 leading-tight">{parts.dateLine}</p>
      <p className="text-xs md:text-sm text-gray-600 leading-tight mt-0.5">{parts.timeLine}</p>
    </div>
  )
}
