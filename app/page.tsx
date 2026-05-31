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

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff5f7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "#111",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "8px",
        }}
      >
        보험상담소
      </h1>

      <p
        style={{
          color: "#ff6b8a",
          fontSize: "14px",
          marginBottom: "24px",
        }}
      >
        Let&apos;s go with LEGO
      </p>

      {/* 현재 시간 표시 */}
      <p
        style={{
          color: "#888",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      >
        {currentTime}
      </p>

      {/* 메뉴 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {/* 출퇴근 보고 */}
        <div style={menuCard}>
          <span style={iconStyle}>➡️</span>
          <h3 style={menuTitle}>출퇴근 보고</h3>
        </div>

        {/* 오류 보고 */}
        <div style={menuCard}>
          <span style={iconStyle}>⚠️</span>
          <h3 style={menuTitle}>오류 보고</h3>
        </div>

        {/* 자료실 */}
        <div style={menuCard}>
          <span style={iconStyle}>📁</span>
          <h3 style={menuTitle}>자료실</h3>
        </div>

        {/* 보험사 연락처 */}
        <div style={menuCard}>
          <span style={iconStyle}>📞</span>
          <h3 style={menuTitle}>보험사 연락처</h3>
        </div>

        {/* 원수사 연락망 */}
        <div style={menuCard}>
          <span style={iconStyle}>👥</span>
          <h3 style={menuTitle}>원수사 연락망</h3>
        </div>

        {/* 공지사항 */}
        <div style={menuCard}>
          <span style={iconStyle}>📢</span>
          <h3 style={menuTitle}>공지사항</h3>
        </div>
      </div>

      {/* 하단 링크 */}
      <div
        style={{
          marginTop: "32px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#aaa",
            fontSize: "13px",
            marginBottom: "12px",
          }}
        >
          PC 버전 바로가기
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <a
            href="#"
            style={bottomLink}
          >
            📄 본부통합시트 ↗
          </a>
          <a
            href="https://drive.google.com/drive/folders/1wiQ_GZf44VjQpvY0MdNfAXbY8CSyN8N2"
            target="_blank"
            rel="noopener noreferrer"
            style={bottomLink}
          >
            📰 소식지 ↗
          </a>
        </div>
      </div>
    </main>
  );
}

const menuCard: React.CSSProperties = {
  background: "white",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const iconStyle: React.CSSProperties = {
  fontSize: "20px",
};

const menuTitle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#333",
  margin: 0,
};

const bottomLink: React.CSSProperties = {
  color: "#666",
  fontSize: "13px",
  textDecoration: "none",
  padding: "8px 16px",
  borderRadius: "20px",
  border: "1px solid #eee",
  background: "white",
};
