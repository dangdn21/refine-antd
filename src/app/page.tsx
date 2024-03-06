"use client";

import { Suspense } from "react";
import { Row, Typography } from "antd";


export default function IndexPage() {
  return (
    <Suspense>
      <Row justify="center" align="middle" style={{
        height: "100vh",
        width: "100vw"
      }}>
        <Typography.Title>Landing Page</Typography.Title>
      </Row>
    </Suspense>
  );
}
