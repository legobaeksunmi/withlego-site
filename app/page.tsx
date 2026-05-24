export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#fff5f7", padding: 24, fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ color: "#ff5c8a" }}>보험상담소</h1>
        <p>Let's go with LEGO</p>

        <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
          <button type="button">출퇴근 보고 준비중</button>
          <button type="button">자료실 준비중</button>
          <button type="button">보험사 연락처 준비중</button>
          <button type="button">원수사 연락망 준비중</button>
          <button type="button">공지사항 준비중</button>
        </div>
      </div>
    </main>
  );
}
