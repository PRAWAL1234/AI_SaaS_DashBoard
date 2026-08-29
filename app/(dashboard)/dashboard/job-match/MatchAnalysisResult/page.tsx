"use client";

import React from "react";
import { Card, Button, Progress, Tag, Flex } from "antd";
import {
  DownloadOutlined,
  ShakeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PieChartOutlined,
  SolutionOutlined,
  BookOutlined,
  KeyOutlined,
} from "@ant-design/icons";

export default function MatchAnalysisResult() {
  // Mock data matching the screen values exactly
  const matchedKeywords = [
    "Figma",
    "User Research",
    "Wireframing",
    "Agile",
    "Cross-Functional Teams",
    "Design Systems",
    "A/B Testing",
  ];
  const missingKeywords = [
    "Framer",
    "React Native",
    "Motion Design",
    "HTML/CSS",
    "B2B SaaS",
  ];

  return (
    <Flex
      vertical
      gap={24}
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      {/* ── Top Header Section ── */}
      <Flex
        justify="space-between"
        align="flex-start"
        style={{ width: "100%" }}
      >
        <div>
          {/* Breadcrumb style tags */}
          <Flex gap={8} align="center" style={{ marginBottom: "8px" }}>
            <Tag color="blue" style={{ borderRadius: "4px", fontWeight: 500 }}>
              Senior Product Designer
            </Tag>
            <span style={{ color: "#94a3b8" }}>→</span>
            <Tag style={{ borderRadius: "4px", fontWeight: 500 }}>
              Acme Corp JD
            </Tag>
          </Flex>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Match Analysis
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: "4px 0 0" }}>
            Comparing{" "}
            <span style={{ color: "#334155", fontWeight: 500 }}>
              "Alex_Chen_Resume_v4.pdf"
            </span>{" "}
            against job requirements...
          </p>
        </div>

        {/* Action Buttons */}
        <Flex gap={12}>
          <Button
            icon={<DownloadOutlined />}
            size="large"
            style={{ borderRadius: "8px", fontWeight: 500 }}
          >
            Download Report
          </Button>
          <Button
            type="primary"
            icon={<ShakeOutlined />}
            size="large"
            style={{
              backgroundColor: "#4f46e5",
              borderColor: "#4f46e5",
              borderRadius: "8px",
              fontWeight: 500,
            }}
          >
            Optimize Resume
          </Button>
        </Flex>
      </Flex>

      {/* ── Row 1: Overall Match & Category Breakdown ── */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {/* Left Card: Overall Match Circular Progress */}
        <Card
          variant="borderless"
          style={{
            flex: "1 1 300px",
            borderRadius: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "24px",
            }}
          >
            Overall Match
          </h3>
          <Progress
            type="circle"
            percent={78}
            strokeColor="#4f46e5"
            strokeWidth={8}
            format={(percent) => (
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                {percent}%
              </span>
            )}
          />
          <h4
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#0f172a",
              marginTop: "24px",
              marginBottom: "4px",
            }}
          >
            Strong Candidate
          </h4>
          <p
            style={{
              color: "#64748b",
              fontSize: "13px",
              lineHeight: "1.5",
              margin: 0,
              padding: "0 16px",
            }}
          >
            Meets core requirements but lacks some preferred qualifications in
            advanced prototyping.
          </p>
        </Card>

        {/* Right Card: Category Breakdown Linear Progress Bars */}
        <Card
          variant="borderless"
          style={{
            flex: "2 1 500px",
            borderRadius: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "20px",
            }}
          >
            Category Breakdown
          </h3>

          <Flex vertical gap={16}>
            {/* Skills Match */}
            <div>
              <Flex
                justify="space-between"
                style={{
                  marginBottom: "4px",
                  fontSize: "13px",
                  color: "#475569",
                }}
              >
                <span>
                  <PieChartOutlined
                    style={{ marginRight: "8px", color: "#64748b" }}
                  />{" "}
                  Skills Match
                </span>
                <span style={{ fontWeight: 600 }}>85%</span>
              </Flex>
              <Progress
                percent={85}
                showInfo={false}
                strokeColor="#4f46e5"
                railColor="#f1f5f9"
              />
            </div>

            {/* Experience Level */}
            <div>
              <Flex
                justify="space-between"
                style={{
                  marginBottom: "4px",
                  fontSize: "13px",
                  color: "#475569",
                }}
              >
                <span>
                  <SolutionOutlined
                    style={{ marginRight: "8px", color: "#64748b" }}
                  />{" "}
                  Experience Level
                </span>
                <span style={{ fontWeight: 600 }}>82%</span>
              </Flex>
              <Progress
                percent={82}
                showInfo={false}
                strokeColor="#4f46e5"
                railColor="#f1f5f9"
              />
            </div>

            {/* Education */}
            <div>
              <Flex
                justify="space-between"
                style={{
                  marginBottom: "4px",
                  fontSize: "13px",
                  color: "#475569",
                }}
              >
                <span>
                  <BookOutlined
                    style={{ marginRight: "8px", color: "#64748b" }}
                  />{" "}
                  Education
                </span>
                <span style={{ fontWeight: 600 }}>100%</span>
              </Flex>
              <Progress
                percent={100}
                showInfo={false}
                strokeColor="#4f46e5"
                railColor="#f1f5f9"
              />
            </div>

            {/* Keyword Density */}
            <div>
              <Flex
                justify="space-between"
                style={{
                  marginBottom: "4px",
                  fontSize: "13px",
                  color: "#475569",
                }}
              >
                <span>
                  <KeyOutlined
                    style={{ marginRight: "8px", color: "#64748b" }}
                  />{" "}
                  Keyword Density
                </span>
                <span style={{ fontWeight: 600 }}>54%</span>
              </Flex>
              <Progress
                percent={54}
                showInfo={false}
                strokeColor="#eab308"
                railColor="#f1f5f9"
              />
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "11px",
                  margin: "6px 0 0 0",
                }}
              >
                Several key terms from the job description are missing in the
                resume text.
              </p>
            </div>
          </Flex>
        </Card>
      </div>

      {/* ── Row 2: Keyword Analysis Section ── */}
      <Card
        variant="borderless"
        style={{
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          width: "100%",
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: "20px" }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#1e293b",
              margin: 0,
            }}
          >
            Keyword Analysis
          </h3>
          <Button
            type="text"
            style={{ color: "#4f46e5", fontWeight: 600, padding: 0 }}
          >
            View Full Text
          </Button>
        </Flex>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
          }}
        >
          {/* Left Column: Matched Keywords */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#475569",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleOutlined style={{ color: "#22c55e" }} /> Matched
              Keywords (JD & Resume)
            </h4>
            <Flex wrap="wrap" gap={8}>
              {matchedKeywords.map((kw, i) => (
                <Tag
                  key={i}
                  style={{
                    backgroundColor: "#f0fdf4",
                    color: "#16a34a",
                    borderColor: "#bbf7d0",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                >
                  {kw}
                </Tag>
              ))}
            </Flex>
          </div>

          {/* Right Column: Missing Keywords + AI Suggestion Box */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#475569",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CloseCircleOutlined style={{ color: "#ef4444" }} /> Missing
              Keywords (In JD Only)
            </h4>
            <Flex wrap="wrap" gap={8} style={{ marginBottom: "20px" }}>
              {missingKeywords.map((kw, i) => (
                <Tag
                  key={i}
                  style={{
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    borderColor: "#fecaca",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                >
                  {kw}
                </Tag>
              ))}
            </Flex>

            {/* AI Suggestion Blue Box */}
            <div
              style={{
                backgroundColor: "#f0f5ff",
                border: "1px solid #e0eaff",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#3b82f6",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                AI Suggestion:
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#475569",
                  lineHeight: "1.5",
                }}
              >
                Add context around{" "}
                <span style={{ fontWeight: 600, color: "#1e293b" }}>
                  "B2B SaaS"
                </span>{" "}
                experiences if applicable, and explicitly mention tools used for
                prototyping like{" "}
                <span style={{ fontWeight: 600, color: "#1e293b" }}>
                  Framer
                </span>{" "}
                if you have experience with them.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Flex>
  );
}
