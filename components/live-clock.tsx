"use client"

import { useEffect, useState } from "react"

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"]

function format(now: Date) {
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekday = WEEKDAYS[now.getDay()]

  let hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const meridiem = hours < 12 ? "오전" : "오후"
  hours = hours % 12
  if (hours === 0) hours = 12

  return `${year}년 ${month}월 ${day}일 [${weekday}] ${meridiem} ${hours}:${minutes}`
}

export function LiveClock() {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setText(format(new Date()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="text-center text-rose-400 text-sm font-medium mt-8" suppressHydrationWarning>
      {text ?? "\u00A0"}
    </p>
  )
}
