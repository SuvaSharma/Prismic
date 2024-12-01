import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const urbanist = Urbanist({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#ced6e0] text-[#ffffff]">
    
      <body
        className={urbanist.className}
      >
          <Header />
        {children}
        <div className="h-[500vh]"></div>
      </body>
    </html>
  );
}
