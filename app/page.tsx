export default function Home() {
  const menus = [
    ["출퇴근 보고", "원수사 연락망"],
    ["보험사 연락처", "자료실"],
    ["공지사항", "오류보고"],
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff5f7",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          margin: "0 auto",
          background: "white",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#ff5c8a",
            textAlign: "center",
            fontSize: "32px",
            marginBottom: "8px",
          }}
        >
          보험상담소
        </h1>

        <p
          style={{
            textAlign: "center",
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
          {menus.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              {row.map((menu) => (
                <button
                  key={menu}
                  onClick={() => alert(`${menu} 준비중`)}
                  style={{
                    border: "1px solid #ffd1dc",
                    background: "white",
                    padding: "18px",
                    borderRadius: "18px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  {menu}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
