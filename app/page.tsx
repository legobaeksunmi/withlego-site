"use client";

export default function Home() {
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
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="#ff8fa3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          <span style={menuTitle}>출퇴근 보고</span>
        </div>

        {/* 오류 보고 */}
        <div style={menuCard}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="#ff8fa3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span style={menuTitle}>오류 보고</span>
        </div>

        {/* 자료실 */}
        <div style={menuCard}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="#ff8fa3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
          <span style={menuTitle}>자료실</span>
        </div>

        {/* 보험사 연락처 */}
        <div style={menuCard}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="#ff8fa3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span style={menuTitle}>보험사 연락처</span>
        </div>

        {/* 원수사 연락망 */}
        <div style={menuCard}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="#ff8fa3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span style={menuTitle}>원수사 연락망</span>
        </div>

        {/* 공지사항 */}
        <div style={menuCard}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="#ff8fa3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span style={menuTitle}>공지사항</span>
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
        <a
          href="#"
          style={bottomLink}
        >
          <svg style={{ width: "14px", height: "14px", marginRight: "6px" }} viewBox="0 0 24 24" fill="none" stroke="#ff8fa3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          본부통합시트
          <svg style={{ width: "12px", height: "12px", marginLeft: "4px" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
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
  width: "24px",
  height: "24px",
  flexShrink: 0,
};

const menuTitle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#333",
};

const bottomLink: React.CSSProperties = {
  color: "#666",
  fontSize: "13px",
  textDecoration: "none",
  padding: "8px 16px",
  borderRadius: "20px",
  border: "1px solid #eee",
  background: "white",
  display: "inline-flex",
  alignItems: "center",
};
