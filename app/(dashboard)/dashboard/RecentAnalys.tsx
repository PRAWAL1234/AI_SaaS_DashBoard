import React, { useMemo } from "react";
import { Listy, Card, Tag, Button, Spin, Flex, Empty } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/Routes/routes";
import { useResumeUpload } from "@/app/hooks/useResume";
import { getScoreStatus } from "./ResumeAnalysisDetails";

const RecentAnalyses = () => {
  const { getResumeByUserId, setCurrentAnalysis } = useResumeUpload();
  const router = useRouter();

  const rawList = getResumeByUserId?.data || [];

  const data = useMemo(
    () =>
      rawList.slice(0, 4).map((item: any) => ({
        raw: item,
        id: item.id,
        fileName: item.fileName,
        keyword_gaps: item.keyword_gaps,
        time: item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : "Recent",
        score: item.overall_score ?? 0,
        status: getScoreStatus(item.overall_score).label,
      })),
    [rawList],
  );

  return (
    <Flex
      flex={1}
      vertical
      style={{
        width: "100%",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header section with title and View All action button */}
      <Card style={{ width: "100%" }}>
        <Flex justify="space-between" align="center">
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            Recent Analyses
          </h3>
          <Button
            type="text"
            style={{ color: "#4f46e5", fontWeight: "600", padding: 0 }}
            onClick={() => router.push(ROUTES.HISTORY)}
          >
            View All
          </Button>
        </Flex>

        {getResumeByUserId.isLoading ? (
          <Flex justify="center" align="center" style={{ padding: 40 }}>
            <Spin />
          </Flex>
        ) : data.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No recent analyses yet"
          />
        ) : (
          <Listy
            items={data}
            rowKey={(item: any) => item.id}
            itemRender={(item: any) => (
              <Card
                variant="borderless"
                hoverable
                // onClick={() => setCurrentAnalysis(item.raw)}
                style={{
                  borderRadius: "16px",
                  background: "#ffffff",
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  border: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {/* Left Side: Document Icon Box */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "44px",
                      height: "44px",
                      backgroundColor: "#eef2ff",
                      borderRadius: "10px",
                      color: "#4f46e5",
                      marginRight: "12px",
                      flexShrink: 0,
                    }}
                  >
                    <FileTextOutlined style={{ fontSize: "20px" }} />
                  </div>

                  {/* Middle Section: File Details and Status tags */}
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#1e293b",
                        marginBottom: "4px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.fileName}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <Tag
                        style={{
                          backgroundColor: "#e0e7ff",
                          color: "#4338ca",
                          border: "none",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "500",
                          padding: "0px 10px",
                        }}
                      >
                        {item.status}
                      </Tag>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#64748b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: ATS Score display */}
                  <div
                    style={{
                      textAlign: "right",
                      marginLeft: "12px",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#312e81",
                        display: "block",
                        lineHeight: "1",
                      }}
                    >
                      {item.score}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: "500",
                      }}
                    >
                      /100
                    </span>
                  </div>
                </div>
              </Card>
            )}
          />
        )}
      </Card>
    </Flex>
  );
};

export default RecentAnalyses;
