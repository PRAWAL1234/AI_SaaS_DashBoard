"use client";

import { Button, Flex, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ResumeUpload from "./ResumeUpload";
import RecentAnalyses from "./RecentAnalys";

export default function DashboardPage() {
  return (
    <Flex
      vertical
      gap={24}
      style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
    >
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#111827",
              margin: 0,
            }}
          >
            Welcome User Name. Ready to optimize?
          </h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: "4px 0 0" }}>
            Upload a new resume or paste your text below to get instant
            AI-driven insights, keyword gap analysis, and formatting
            suggestions.
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          style={{
            backgroundColor: "#4f46e5",
            borderColor: "#4f46e5",
            borderRadius: "8px",
          }}
        >
          New Analysis
        </Button>
      </Flex>

      {/* ── Main Content Area ── */}
      {/* Handled responsive view using flex wrap instead of raw tailwind strings */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* Left Box: Upload Resume Container */}
        <div style={{ flex: "1 1 500px", minWidth: "320px" }}>
          <Card
            variant="borderless"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              borderRadius: "12px",
              height: "100%",
            }}
            styles={{ body: { padding: "16px" } }}
          >
            <ResumeUpload />
          </Card>
        </div>

        {/* Right Box: Recent Analyses List */}
        {/* Removed extra Card wrapper to fix double-padding bug */}
        <div style={{ flex: "0 0 360px", minWidth: "320px" }}>
          <RecentAnalyses />
        </div>
      </div>
    </Flex>
  );
}
