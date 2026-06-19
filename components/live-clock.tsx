"use client"

import { useEffect, useState } from "react"

const WEEKDAYS = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]

function formatDateTime(date: Date) {
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

  return `${year}년 ${month}월 ${day}일 ${weekday} ${meridiem} ${hours12}시 ${paddedMinutes}분`
}

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const dateTime = now ? formatDateTime(now) : ""

  return (
    <div
      className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-rose-100 flex flex-col justify-center"
      suppressHydrationWarning
    >
      <p className="text-base md:text-lg font-bold text-gray-900 leading-tight">To day 💕</p>
      <p className="text-xs md:text-sm font-medium text-rose-400 leading-tight mt-1">{dateTime}</p>
    </div>
  )
}
