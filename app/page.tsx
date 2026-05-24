export default function Home() {
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
          Let's go with LEGO
        </p>

        <div
          style={{
            display: "grid",
            gap: "14px",
          }}
        >
          <button style={btn}>출퇴근 보고</button>
          <button style={btn}>자료실</button>
          <button style={btn}>보험사 연락처</button>
          <button style={btn}>원수사 연락망</button>
          <button style={btn}>공지사항</button>
        </div>
      </div>
    </main>
  );
}

const btn = {
  border: "1px solid #ffd1dc",
  background: "white",
  padding: "16px",
  borderRadius: "16px",
  fontSize: "16px",
  cursor: "pointer",
};
