"use client";

import React, { useMemo } from "react";
import { Card, Button, Progress, Tag, Flex, Dropdown, Avatar, App } from "antd";
import {
  FilterOutlined,
  CalendarOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useResumeUpload } from "@/app/hooks/useResume";

export default function AnalysisHistory() {
  const { getResumeByUserId } = useResumeUpload();
  const rawList = getResumeByUserId?.data || [];
  const historyData = useMemo(
    () =>
      rawList.slice(0, 4).map((item: any) => ({
        id: 1,
        name: "John Doe",
        role: "Senior Frontend Engineer",
        initials: "JD",
        avatarColor: "#eff6ff",
        avatarTextColor: "#1d4ed8",
        matchScore: 85,
        progressBarColor: "#4f46e5",
        skills: ["React", "TypeScript", "Tailwind"],
        date: "Oct 24, 2023",
        team: "Tech Team",
      })),
    [rawList],
  );

  // Filter dropdown menu option items
  const filterMenuItems: MenuProps["items"] = [
    { key: "1", label: "Highest Score" },
    { key: "2", label: "Lowest Score" },
    { key: "3", label: "Most Recent" },
  ];

  return (
    <Flex
      vertical
      style={{
        width: "100%",
        minHeight: "calc(100vh - 110px)",
        padding: "24px",
      }}
    >
      {/* ── Top Header and Action Button Area ── */}
      <Flex
        justify="space-between"
        align="center"
        style={{ width: "100%", marginBottom: "24px" }}
      >
        <div>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Analysis History
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: "4px 0 0" }}>
            Review and manage your previously analyzed resumes.
          </p>
        </div>

        {/* Filter Selection Dropdown Button */}
        <Dropdown menu={{ items: filterMenuItems }} trigger={["click"]}>
          <Button
            icon={<FilterOutlined />}
            size="middle"
            style={{ borderRadius: "8px", fontWeight: 500 }}
          >
            Filter{" "}
            <span style={{ color: "#94a3b8", marginLeft: "4px" }}>▾</span>
          </Button>
        </Dropdown>
      </Flex>

      {/* ── Main Content Grid Grid System ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
          width: "100%",
          alignItems: "start",
        }}
      >
        {historyData.map((item: any) => (
          <Card
            key={item.id}
            variant="borderless"
            style={{
              borderRadius: "16px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              background: "#ffffff",
            }}
            styles={{ body: { padding: "24px" } }}
          >
            {/* Top Row: User Avatar and Identity Details */}
            <Flex gap={16} align="flex-start" style={{ marginBottom: "20px" }}>
              <Avatar
                size={44}
                style={{
                  backgroundColor: item.avatarColor,
                  color: item.avatarTextColor,
                  fontWeight: "700",
                  fontSize: "14px",
                  borderRadius: "10px",
                }}
              >
                {item.initials}
              </Avatar>
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    margin: "2px 0 0 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.role}
                </p>
              </div>
            </Flex>

            {/* Middle Section: Match Metric Progress Indicators */}
            <div style={{ marginBottom: "20px" }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ marginBottom: "4px" }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#64748b",
                  }}
                >
                  Match Score
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: item.progressBarColor,
                  }}
                >
                  {item.matchScore}%
                </span>
              </Flex>
              <Progress
                percent={item.matchScore}
                showInfo={false}
                strokeColor={item.progressBarColor}
                railColor="#f1f5f9"
                size="medium"
              />
            </div>

            <Flex
              wrap="wrap"
              gap={8}
              style={{ marginBottom: "24px", minHeight: "32px" }}
            >
              {item.skills.map((skill: any, index: number) => (
                <Tag
                  key={index}
                  style={{
                    backgroundColor: "#f8fafc",
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    padding: "2px 8px",
                    margin: 0,
                    fontSize: "12px",
                  }}
                >
                  {skill}
                </Tag>
              ))}
            </Flex>

            {/* Bottom Section: Footer Metadata Information */}
            <Flex
              justify="space-between"
              align="center"
              style={{
                borderTop: "1px solid #f1f5f9",
                paddingTop: "16px",
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              <Flex align="center" gap={6}>
                <CalendarOutlined style={{ color: "#94a3b8" }} />
                <span>{item.date}</span>
              </Flex>
              <Flex align="center" gap={6}>
                <FolderOutlined style={{ color: "#94a3b8" }} />
                <span>{item.team}</span>
              </Flex>
            </Flex>
          </Card>
        ))}
      </div>
    </Flex>
  );
}
