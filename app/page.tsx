export default function Home() {
  const openPage = (name: string) => {
    alert(name + " 기능은 다음 단계에서 연결할게요.");
  };

  return (
    <main style={{ minHeight: "100vh", background: "#fff5f7", padding: 24, fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 420, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ color: "#ff5c8a" }}>보험상담소</h1>
        <p>Let's go with LEGO</p>

        <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
          <button onClick={() => openPage("출퇴근 보고")}>출퇴근 보고</button>
          <button onClick={() => openPage("자료실")}>자료실</button>
          <button onClick={() => openPage("보험사 연락처")}>보험사 연락처</button>
          <button onClick={() => openPage("원수사 연락망")}>원수사 연락망</button>
          <button onClick={() => openPage("공지사항")}>공지사항</button>
        </div>
      </div>
    </main>
  );
}
