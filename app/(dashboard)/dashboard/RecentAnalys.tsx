import React from "react";
import { List, Card, Tag, Button, Listy } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/Routes/routes";

const RecentAnalyses = () => {
  // Mock data representing the list of recent resume analyses
  const router = useRouter();
  const data = [
    {
      id: 1,
      fileName: "Alex_SoftwareEngin...",
      status: "Completed",
      time: "2 hours ago",
      score: 85,
    },
    {
      id: 2,
      fileName: "Frontend_Dev_Resu...",
      status: "Completed",
      time: "Yesterday",
      score: 92,
    },
    {
      id: 3,
      fileName: "Product_Manager_Dr...",
      status: "Completed",
      time: "Oct 12",
      score: 74,
    },
  ];

  return (
    <div
      style={{
        maxWidth: "360px",
        margin: "20px auto",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header section with title and View All action button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#0f172a",
            margin: 0,
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
      </div>

      {/* List container for the analyzed item cards */}
      <Listy
        items={data}
        rowKey={(item) => item.id}
        itemRender={(item) => (
          <Card
            variant="borderless"
            style={{
              marginBottom: "12px",
              borderRadius: "16px",
              background: "#ffffff",
            }}
            styles={{
              body: {
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "between",
              },
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
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
                      margin: 0,
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
    </div>
  );
};

export default RecentAnalyses;
