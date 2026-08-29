"use client";

import { Button } from "antd";
import {
  FileSearchOutlined,
  TagsOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Navbar from "../components/common/Navbar";
import FeatureCard from "../components/common/FeatureCard";
import { ROUTES } from "../Routes/routes";

export default function Home() {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px 60px",
          background: "#fff",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#EEF2FF",
            color: "#4F46E5",
            fontSize: 12,
            fontWeight: 500,
            padding: "4px 12px",
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          ResumeAI 2.0 is live
        </span>

        <h1
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#111827",
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.3,
          }}
        >
          Analyze your resume with{" "}
          <span style={{ color: "#4F46E5" }}>AI precision.</span>
        </h1>

        <p
          style={{
            color: "#6B7280",
            fontSize: 15,
            maxWidth: 480,
            margin: "16px auto 32px",
            lineHeight: 1.6,
          }}
        >
          Get hired faster with instant ATS optimization and expert content
          insights. Our AI analyzes your resume against millions of successful
          profiles to give you a competitive edge.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href={ROUTES.SIGNUP}>
            <Button type="primary" size="large">
              Try for Free
            </Button>
          </Link>
          <Link href={ROUTES.LOGIN}>
            <Button size="large">View Demo</Button>
          </Link>
        </div>

        {/* Dashboard Mockup Image Placeholder */}
        <div
          style={{
            maxWidth: 900,
            margin: "48px auto 0",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            border: "1px solid #F0F0F0",
          }}
        >
          <img
            src="landing page image/screen.png"
            alt="ResumeAI Dashboard Preview"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </section>

      {/* Supercharge Section */}
      <section
        style={{
          background: "#F5F6FF",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#111827",
            marginBottom: 12,
          }}
        >
          Supercharge your career
        </h2>
        <p
          style={{
            color: "#6B7280",
            fontSize: 15,
            maxWidth: 500,
            margin: "0 auto 48px",
          }}
        >
          Actionable insights powered by advanced natural language processing to
          ensure your resume passes the screen and impresses the recruiter.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          <FeatureCard
            icon={<FileSearchOutlined />}
            title="ATS Scoring"
            description="Instantly see how your resume scores against applicant tracking systems. We check for formatting, readability, and critical section completeness."
          />
          <FeatureCard
            icon={<TagsOutlined />}
            title="Keyword Extraction"
            description="Identify missing industry-specific keywords based on your target role. Compare your resume text against thousands of job descriptions."
          />
          <FeatureCard
            icon={<BulbOutlined />}
            title="Content Suggestions"
            description="Transform passive descriptions into impactful achievements. Get actionable rewrite suggestions to highlight your quantifiable impact."
          />
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "24px 20px",
          fontSize: 13,
          color: "#9CA3AF",
          borderTop: "1px solid #F0F0F0",
        }}
      >
        © 2024 ResumeAI Technologies. All rights reserved.
      </footer>
    </div>
  );
}
