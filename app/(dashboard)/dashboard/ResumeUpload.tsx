"use client";
import React from "react";
import { Upload, Button, App } from "antd";
import {
  UploadOutlined,
  FileTextOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useResume } from "@/app/services/Resume";
import { useMutation } from "@tanstack/react-query";
import * as pdfjsLib from "pdfjs-dist";
import { useSyncUser } from "@/app/store/userStore";
import { useResumeUpload } from "@/app/hooks/useResume";

const { Dragger } = Upload;
// PDF Worker Configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const ResumeUpload = () => {
  const { message } = App.useApp();
  const { resumeMutation } = useResumeUpload();

  const extractPdfText = async (file: File) => {
    const pdf = await pdfjsLib.getDocument({
      data: await file.arrayBuffer(),
    }).promise;

    let text = "";

    for (let page = 1; page <= pdf.numPages; page++) {
      const pdfPage = await pdf.getPage(page);

      const content = await pdfPage.getTextContent();

      text += content.items.map((item: any) => item.str).join(" ");

      text += "\n";
    }

    return text;
  };

  // Main upload handler
  const handleUpload = async (file: File) => {
    try {
      const text = await extractPdfText(file);

      if (!text.trim()) {
        message.error("No text found in resume");
        return false;
      }

      const formData = new FormData();

      formData.append("resume_text", text);

      await resumeMutation.mutateAsync(formData);
    } catch (error) {
      console.error(error);
      message.error("Failed to read resume");
    }

    return false;
  };

  // Upload configuration and restrictions
  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".pdf,.docx,.txt",
    beforeUpload: (file: File) => {
      if (file.size > 5 * 1024 * 1024) {
        message.error("File must be smaller than 5MB");
        return Upload.LIST_IGNORE;
      }
      handleUpload(file);
      return false;
    },
  };

  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      {/* Main Drag & Drop Zone */}
      <Dragger
        {...uploadProps}
        style={{
          background: "#f9faff",
          border: "1px dashed #d9d9d9",
          borderRadius: "12px",
          padding: "24px",
        }}
        showUploadList={false}
      >
        {/* Document Icon Wrapper */}
        <div className="ant-upload-drag-icon" style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              backgroundColor: "#eeedf9",
              borderRadius: "50%",
              color: "#4f46e5",
            }}
          >
            <FileTextOutlined style={{ fontSize: "22px" }} />
          </div>
        </div>

        {/* Main Heading */}
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#0f172a",
            margin: "0 0 8px 0",
          }}
        >
          Drag & Drop Resume Here
        </h3>

        {/* File Formats Label */}
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
          Supports PDF, DOCX, or TXT (Max 5MB)
        </p>

        {/* Custom Actions Container */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={(e) => e.stopPropagation()} // Prevents triggering dragger click when buttons are clicked
        >
          <Upload {...uploadProps} showUploadList={false}>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              style={{
                backgroundColor: "#5046e5",
                borderColor: "#5046e5",
                height: "40px",
                borderRadius: "8px",
                fontWeight: "500",
              }}
            >
              Upload Resume
            </Button>
          </Upload>

          <Button
            style={{
              height: "40px",
              borderRadius: "8px",
              backgroundColor: "#eef2ff",
              color: "#312e81",
              borderColor: "transparent",
              fontWeight: "500",
            }}
            onClick={(e) => {
              e.stopPropagation();
              const text = prompt("Enter your resume text here:");
              if (text && text.trim()) {
                const formData = new FormData();
                formData.append("resume_text", text.trim());
                resumeMutation.mutateAsync(formData);
              }
            }}
          >
            Or paste text here
          </Button>
        </div>
      </Dragger>

      {/* Pro Tip Section */}
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "#f0f5ff",
          border: "1px solid #e0eaff",
          borderRadius: "12px",
          padding: "16px",
          display: "flex",
          gap: "12px",
        }}
      >
        {/* Ant Design Bulb Icon */}
        <div style={{ color: "#4f46e5", marginTop: "2px" }}>
          <BulbOutlined style={{ fontSize: "20px" }} />
        </div>
        <div>
          <h4
            style={{
              margin: "0 0 4px 0",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1e1b4b",
            }}
          >
            Pro Tip
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#475569",
              lineHeight: "1.5",
            }}
          >
            Ensure your resume is ATS-friendly by using standard headings like
            "Experience" and "Education". Our AI checks for standard
            parsability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
