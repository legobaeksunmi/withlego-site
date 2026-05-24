export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff5f7",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "12px",
          color: "#ff5c8a"
        }}>
          LEGO 본부
        </h1>

        <p style={{
          color: "#666",
          marginBottom: "24px"
        }}>
          연결 테스트 성공 🎉
        </p>

        <button style={{
          border: "none",
          background: "#ff5c8a",
          color: "white",
          padding: "12px 24px",
          borderRadius: "14px",
          fontSize: "16px",
          cursor: "pointer"
        }}>
          정상 작동 중
        </button>
      </div>
    </main>
  );
}
