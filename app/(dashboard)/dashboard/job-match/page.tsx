"use client";

import React, { useState } from "react";
import { Tabs, Input, Button, Card, Flex } from "antd";
import { BulbOutlined, ShakeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/Routes/routes";

const { TextArea } = Input;

const JobMatch = () => {
  const [text, setText] = useState("");
  const maxCharacterLimit = 5000;
  const router = useRouter();

  // Handles state change for the job description text area
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxCharacterLimit) {
      setText(e.target.value);
    }
  };

  const onMatch = () => {
    router.push(ROUTES.MATCH_ANALYSIS);
  };
  // Tab content configurations for 'Paste JD' and 'Job URL'
  const tabItems = [
    {
      key: "1",
      label: "Paste JD",
      children: (
        <div style={{ position: "relative" }}>
          <TextArea
            rows={8}
            placeholder="Paste the full job description here (responsibilities, requirements, qualifications)..."
            value={text}
            onChange={handleTextChange}
            style={{
              borderRadius: "8px",
              borderColor: "#e2e8f0",
              padding: "16px",
              paddingBottom: "32px", // Leaves space for the character counter
              resize: "none",
              fontSize: "14px",
              color: "#334155",
            }}
          />
          {/* Character counter positioned inside the bottom right of the textarea */}
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "16px",
              fontSize: "12px",
              color: "#94a3b8",
              fontFamily: "monospace",
            }}
          >
            ≡ {text.length} / {maxCharacterLimit}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Job URL",
      children: (
        <Input
          placeholder="Enter the job posting URL here..."
          style={{ borderRadius: "8px", padding: "10px 16px" }}
        />
      ),
    },
  ];

  return (
    <Flex
      vertical
      style={{
        width: "100%",
        minHeight: "calc(100vh - 110px)",
        justifyContent: "space-between",
      }}
    >
      {/* ── Main Scrollable Content Area ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        {/* Header section with title and subtitle */}
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#0f172a",
              margin: "0 0 4px 0",
            }}
          >
            Analyze Job Match
          </h2>
          <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
            Provide the job description to tailor the AI's screening criteria.
          </p>
        </div>

        {/* Main content grid splitting input form and the sidebar pro tip */}
        {/* Updated grid fractions to exactly match the look of the new image */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Left Side: Container Card for Tabs and Forms */}
          <Card
            variant="borderless"
            style={{
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              background: "#ffffff",
              flex: "1 1 65%",
            }}
            styles={{ body: { padding: "24px" } }}
          >
            <Tabs
              defaultActiveKey="1"
              items={tabItems}
              tabBarStyle={{ marginBottom: "16px", borderColor: "#f1f5f9" }}
            />

            {/* Action Area: Positioned beautifully right at the bottom right of the tabs card */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <Button
                type="primary"
                icon={<ShakeOutlined />}
                size="large"
                style={{
                  backgroundColor: "#2563eb", // Deep indigo blue variant matching the image action state
                  borderColor: "#2563eb",
                  borderRadius: "8px",
                  fontWeight: "600",
                  padding: "0 24px",
                  height: "40px",
                }}
                onClick={onMatch}
              >
                Analyze Match
              </Button>
            </div>
          </Card>

          {/* Right Side: Informative Sidebar Card (Pro Tip) */}
          <div
            style={{
              backgroundColor: "#f0f4ff",
              border: "1px solid #e0e8ff",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              gap: "16px",
              flex: "1 1 35%",
            }}
          >
            <div style={{ color: "#4f46e5", marginTop: "2px" }}>
              <BulbOutlined style={{ fontSize: "20px" }} />
            </div>
            <div>
              <h4
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#1e1b4b",
                }}
              >
                Pro Tip: Why context matters
              </h4>
              <p
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "13px",
                  color: "#475569",
                  lineHeight: "1.6",
                }}
              >
                Pasting the complete job description allows our AI to map
                specific terminology, soft skills, and required experience
                levels against candidate profiles.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#475569",
                  lineHeight: "1.6",
                }}
              >
                Analyses with a detailed JD yield{" "}
                <span style={{ color: "#4f46e5", fontWeight: "600" }}>
                  40% higher accuracy
                </span>{" "}
                in identifying top-tier talent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default JobMatch;
