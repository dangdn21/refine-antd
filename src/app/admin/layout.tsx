import { useNotificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { authProvider } from "@providers/auth-provider";
import { dataProvider } from "@providers/rest-data-provider/data-provider";
import { AntdInferencer } from "@refinedev/inferencer/antd";


import "@refinedev/antd/dist/reset.css";

export const metadata: Metadata = {
  title: "Herond",
  description: "Herond Dashboard",
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
        <Suspense>
          <AntdRegistry>
            <ColorModeContextProvider defaultMode={theme?.value}>
              <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                authProvider={authProvider}
                resources={[
                  // templates
                  {
                    name: "comments",
                    list: "/admin/comments",
                    create: "/admin/comments/create",
                    edit: "/admin/comments/edit/:id",
                    show: "/admin/comments/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "nOWtXo-dTEcSU-9TtlfP"
                }}
              >
                {children}
              </Refine>
            </ColorModeContextProvider>
          </AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
