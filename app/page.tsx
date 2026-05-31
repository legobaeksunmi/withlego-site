"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours < 12 ? "오전" : "오후";
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, "0");
      
      return `${year}년 ${month}월 ${day}일 ${ampm} ${displayHours}:${displayMinutes}`;
    };

    setCurrentTime(formatTime());
    const interval = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { label: "출퇴근 보고", href: "#" },
    { label: "원수사 연락망", href: "#" },
    { label: "보험사 연락처", href: "#" },
    { label: "자료실", href: "#" },
    { label: "공지사항", href: "#" },
    { label: "오류보고", href: "#" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff5f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "360px",
          background: "white",
          padding: "32px",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#ff5c8a",
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          보험상담소
        </h1>

        <p
          style={{
            color: "#888",
            marginBottom: "28px",
          }}
        >
          Let&apos;s go with LEGO
        </p>

        {/* 현재 시간 표시 */}
        <p
          style={{
            color: "#666",
            fontSize: "14px",
            marginBottom: "16px",
          }}
        >
          {currentTime}
        </p>

        {/* 2열 메뉴 배치 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
          }}
        >
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={btn}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* 하단 바로가기 링크 */}
        <div
          style={{
            marginTop: "24px",
            fontSize: "12px",
            color: "#999",
          }}
        >
          <a href="#" style={smallLink}>PC버전 바로가기</a>
          <br />
          <a href="#" style={smallLink}>본부통합시트</a>
          <span style={{ margin: "0 8px", color: "#ccc" }}>|</span>
          <a
            href="https://drive.google.com/drive/folders/1wiQ_GZf44VjQpvY0MdNfAXbY8CSyN8N2"
            target="_blank"
            rel="noopener noreferrer"
            style={smallLink}
          >
            소식지
          </a>
        </div>
      </div>
    </main>
  );
}

const btn: React.CSSProperties = {
  border: "1px solid #ffd1dc",
  background: "white",
  padding: "16px",
  borderRadius: "16px",
  fontSize: "16px",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  display: "block",
};

const smallLink: React.CSSProperties = {
  color: "#999",
  textDecoration: "underline",
};
