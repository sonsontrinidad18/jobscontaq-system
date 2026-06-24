import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "JobsContaq — Applicant Management System",
  description:
    "Applicant & Worker Management System by JobsContaq Manpower Corp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#F7F5F0",
        }}
      >
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
          }}
        >
          <MobileNav>
            <Sidebar />
          </MobileNav>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
            <Header />

            <main style={{ flex: 1 }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}