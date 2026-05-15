import "./globals.css";

export const metadata = {
  title: "WITH LEGO 업무 플랫폼",
  description: "LEGO본부 업무 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
