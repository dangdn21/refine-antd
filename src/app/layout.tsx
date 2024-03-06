import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@refinedev/antd/dist/reset.css";

export const metadata: Metadata = {
  title: "Herond",
  description: "Herond LandingPage",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
