import type { Metadata } from "next";
import { Prompt, Sarabun } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  title: "การเต้นลีลาศเบื้องต้น — ศิลปะแห่งจังหวะ",
  description:
    "ประสบการณ์การเรียนรู้เรื่องการเต้นลีลาศเบื้องต้น ความหมาย ประวัติ ประเภท ท่าพื้นฐาน มารยาท และประโยชน์ ในรูปแบบ cinematic storytelling",
  keywords: ["ลีลาศ", "Ballroom Dance", "การเต้นลีลาศ", "จังหวะ", "Waltz", "Tango"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable} ${sarabun.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
