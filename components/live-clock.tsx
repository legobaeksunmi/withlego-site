"use client"

import { useEffect, useState } from "react"

function formatDateTime(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours24 = date.getHours()
  const minutes = date.getMinutes()

  const meridiem = hours24 < 12 ? "오전" : "오후"
  let hours12 = hours24 % 12
  if (hours12 === 0) hours12 = 12

  const paddedMinutes = String(minutes).padStart(2, "0")

  return `${year}년 ${month}월 ${day}일 ${meridiem} ${hours12}시 ${paddedMinutes}분`
}

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="text-center text-xs text-rose-400 font-medium" suppressHydrationWarning>
      {now ? formatDateTime(now) : ""}
    </p>
  )
}
