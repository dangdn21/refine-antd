import React from "react";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import { Typography, theme, Space } from "antd";
import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import NextImage from "next/image";

const defaultText = "Dashboard";

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  text = defaultText,
  wrapperStyles,
}) => {
  const { token } = theme.useToken();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink
      to="/admin"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "24px",
            width: "24px",
            color: token.colorPrimary,
          }}
        >
          <NextImage src="/logo.svg" alt="logo" width="24" height="24" />
        </div>

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "inherit",
              marginBottom: 0,
              fontWeight: 700,
            }}
          >
            {text}
          </Typography.Title>
        )}
      </Space>
    </ActiveLink>
  );
};
