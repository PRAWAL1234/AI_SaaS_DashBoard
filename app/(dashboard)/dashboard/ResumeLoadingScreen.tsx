"use client";

import {
  FileTextOutlined,
  CheckOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export const ResumeLoadingScreen = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f9ff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
          padding: 24,
        }}
      >
        <FileTextOutlined
          style={{
            fontSize: 40,
            color: "#4f46e5",
            marginBottom: 16,
          }}
        />

        <h1 style={{ color: "#4f46e5" }}>ResumeAI</h1>

        {/* Loader */}
        <div
          style={{
            width: 150,
            height: 150,
            margin: "35px auto",
            borderRadius: "50%",
            border: "5px solid #e2dfff",
            borderTopColor: "#4f46e5",
            animation: "spin 1.5s linear infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SyncOutlined
            spin
            style={{
              fontSize: 45,
              color: "#4f46e5",
            }}
          />
        </div>

        <h2>Analyzing your resume...</h2>

        <p style={{ color: "#64748b" }}>This usually takes a few seconds.</p>

        {/* Steps */}
        <div
          style={{
            marginTop: 30,
            background: "#fff",
            padding: 20,
            borderRadius: 16,
            textAlign: "left",
          }}
        >
          <Step status="done" text="Extracting text" />

          <Step status="loading" text="Checking ATS compatibility" />

          <Step status="pending" text="Generating suggestions" />
        </div>
      </div>
    </div>
  );
};

const Step = ({
  status,
  text,
}: {
  status: "done" | "loading" | "pending";
  text: string;
}) => {
  const icon =
    status === "done" ? (
      <CheckOutlined />
    ) : status === "loading" ? (
      <SyncOutlined spin />
    ) : (
      <div />
    );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            status === "done"
              ? "#4f46e5"
              : status === "loading"
                ? "#eeedff"
                : "transparent",
          color: status === "pending" ? "#c7c4d8" : "#fff",
          border: status === "pending" ? "2px solid #c7c4d8" : "none",
        }}
      >
        {icon}
      </div>

      <span
        style={{
          color: status === "loading" ? "#4f46e5" : "#0f172a",
          fontWeight: status === "loading" ? 600 : 400,
        }}
      >
        {text}
      </span>
    </div>
  );
};
