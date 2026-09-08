"use client";

import { Flex, Card } from "antd";
import ResumeUpload from "./ResumeUpload";
import RecentAnalyses from "./RecentAnalys";
import { useSyncUser } from "@/app/store/userStore";
import { useResumeUpload } from "@/app/hooks/useResume";
import { ResumeLoadingScreen } from "./ResumeLoadingScreen";
import ResumeAnalysisDetails from "./ResumeAnalysisDetails";

export default function DashboardPage() {
  const { userName } = useSyncUser();
  const { isUploading, isSuccess, currentAnalysis, clearCurrentAnalysis } =
    useResumeUpload();

  return (
    <Flex
      vertical
      gap={24}
      style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
    >
      {isUploading ? (
        <ResumeLoadingScreen />
      ) : (
        <>
          {isSuccess && currentAnalysis ? (
            <ResumeAnalysisDetails
              data={currentAnalysis}
              onBack={clearCurrentAnalysis}
              onAnalyzeAnother={clearCurrentAnalysis}
            />
          ) : (
            <>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: "100%" }}
              >
                <div>
                  <h1
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    Welcome {userName}. Ready to optimize?
                  </h1>
                  <p
                    style={{
                      color: "#6B7280",
                      fontSize: 14,
                      margin: "4px 0 0",
                    }}
                  >
                    Upload a new resume or paste your text below to get instant
                    AI-driven insights, keyword gap analysis, and formatting
                    suggestions.
                  </p>
                </div>
              </Flex>

              <Flex gap={24} wrap="wrap">
                <div style={{ flex: 1, width: "fit-content" }}>
                  <Card
                    variant="borderless"
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                      borderRadius: "12px",
                    }}
                    styles={{ body: { padding: "16px" } }}
                  >
                    <ResumeUpload />
                  </Card>
                </div>

                <Flex flex={1}>
                  <RecentAnalyses />
                </Flex>
              </Flex>
            </>
          )}
        </>
      )}
    </Flex>
  );
}
