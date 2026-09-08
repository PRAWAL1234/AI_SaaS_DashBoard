"use client";

import React, { useRef } from "react";
import {
  Card,
  Tag,
  Typography,
  Progress,
  Button,
  Space,
  Row,
  Col,
  Divider,
  Empty,
  Skeleton,
  Flex,
} from "antd";

import {
  ThunderboltOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  FileSearchOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  RightOutlined,
  OrderedListOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { motion, Variants } from "framer-motion";
import "./resume-analysis.css";

const { Title, Text, Paragraph } = Typography;

export interface ResumeAnalysis {
  id?: number;
  overall_score: number;
  summary: string;
  keyword_gaps: string[];
  formatting_suggestions: string[];
  actionable_steps: string[];
  created_at?: string;
  updated_at?: string;
}

interface ResumeAnalysisDetailsProps {
  data?: ResumeAnalysis;
  loading?: boolean;
  onBack?: () => void;
  onAnalyzeAnother?: () => void;
}

export const getScoreStatus = (score: number) => {
  if (score >= 80) {
    return {
      label: "Excellent",
      color: "success",
      title: "High ATS Compatibility",
      message: "Your resume is well optimized and highly competitive.",
    };
  }

  if (score >= 60) {
    return {
      label: "Good",
      color: "warning",
      title: "Good Resume Score",
      message: "Your resume is good but has some areas for improvement.",
    };
  }

  return {
    label: "Needs Improvement",
    color: "error",
    title: "Needs Improvement",
    message: "Your resume needs improvement to increase its effectiveness.",
  };
};

// ── Framer Motion Animation Variants ──
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }, // एक-एक करके कार्ड्स लोड होंगे
  },
};

export default function ResumeAnalysisDetails({
  data,
  loading = false,
  onBack,
  onAnalyzeAnother,
}: ResumeAnalysisDetailsProps) {
  const middleSectionRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (middleSectionRef.current) {
      const headerOffset = 80;
      const elementPosition =
        middleSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <ResumeAnalysisSkeleton />;
  }

  if (!data) {
    return (
      <div className="resume-analysis-empty">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Resume Analysis Available"
        >
          <Button type="primary" icon={<FileSearchOutlined />}>
            Upload Resume
          </Button>
        </Empty>
      </div>
    );
  }

  const scoreStatus = getScoreStatus(data.overall_score);

  return (
    <div className="resume-analysis-page">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="analysis-header"
      >
        <div>
          <Title level={2} className="analysis-title">
            Resume Analysis Results
          </Title>

          <Text className="analysis-subtitle">
            Detailed AI-powered insights and recommendations
          </Text>
        </div>

        <Space size="small" wrap>
          <div className="date-badge">
            <CalendarOutlined />
          </div>

          <div className="date-badge">
            <ClockCircleOutlined />
          </div>
        </Space>
      </motion.div>

      {/* ================= FLOATING SCROLL DOWN BUTTON ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Button
            shape="round"
            type="default"
            icon={<ArrowDownOutlined />}
            onClick={scrollToBottom}
            style={{
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              border: "1px solid #d9d9d9",
            }}
          >
            Scroll to Insights
          </Button>
        </motion.div>
      </motion.div>

      {/* ================= SCORE + SUMMARY ================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row gutter={[20, 20]} className="top-section">
          <Col xs={24} xl={9}>
            <motion.div variants={fadeInUp}>
              <Card className="analysis-card score-card">
                <div className="section-heading">
                  <Text className="section-label">OVERALL SCORE</Text>

                  <Tag color="purple">AI Analysis</Tag>
                </div>

                <div className="score-content">
                  <Progress
                    type="circle"
                    percent={data.overall_score}
                    size={110}
                    strokeWidth={9}
                    railColor="var(--analysis-progress-trail)"
                    format={() => (
                      <div>
                        <div className="score-number">{data.overall_score}</div>

                        <div className="score-total">/100</div>
                      </div>
                    )}
                  />

                  <div className="score-details">
                    <Tag
                      color={scoreStatus.color}
                      style={{
                        width: "fit-content",
                      }}
                    >
                      {scoreStatus.label}
                    </Tag>

                    <Title level={4}>{scoreStatus.title}</Title>

                    <Text className="muted-text">{scoreStatus.message}</Text>
                  </div>
                </div>

                <Divider />

                <Text className="muted-text">
                  Your resume has been analyzed based on content, keywords,
                  formatting and overall optimization.
                </Text>
              </Card>
            </motion.div>
          </Col>

          {/* ================= AI SUMMARY ================= */}

          <Col xs={24} xl={15}>
            <motion.div variants={fadeInUp} style={{ height: "100%" }}>
              <Card className="analysis-card summary-card">
                <Flex justify="space-between" align="center">
                  <Flex align="center" className="icon-title">
                    <ThunderboltOutlined className="primary-icon" />

                    <Title level={4}>AI Summary</Title>
                  </Flex>
                </Flex>

                <Paragraph className="summary-text">{data.summary}</Paragraph>

                <Divider />

                <div className="summary-tags">
                  <Tag color="purple">AI Powered</Tag>

                  <Tag color="blue">Resume Insights</Tag>

                  <Tag color="green">Personalized Feedback</Tag>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      {/* ================= KEYWORDS + FORMATTING ================= */}
      <div ref={middleSectionRef} />
      <Row gutter={[20, 20]} className="middle-section">
        {/* KEYWORDS */}

        <Col xs={24} lg={12}>
          <motion.div variants={fadeInUp} style={{ height: "100%" }}>
            <Card className="analysis-card">
              <Flex justify="space-between" align="center">
                <Flex align="center" className="icon-title">
                  <WarningOutlined className="warning-icon" />

                  <Title level={4}>Missing Keywords</Title>
                </Flex>

                <Tag color="orange">{data.keyword_gaps?.length || 0} Found</Tag>
              </Flex>

              <Text className="section-description">
                Adding these keywords may improve your resume's relevance for
                targeted job roles.
              </Text>

              <div className="keywords-wrapper">
                {data.keyword_gaps?.length ? (
                  data.keyword_gaps.map((keyword, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, rotate: 1 }}
                    >
                      <Tag
                        className="keyword-tag"
                        style={{
                          padding: "4px 8px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        + {keyword}
                      </Tag>
                    </motion.div>
                  ))
                ) : (
                  <Text className="muted-text">No keyword gaps found 🎉</Text>
                )}
              </div>
            </Card>
          </motion.div>
        </Col>

        {/* FORMATTING */}

        <Col xs={24} lg={12}>
          <motion.div variants={fadeInUp}>
            <Card className="analysis-card">
              <Flex justify="space-between" align="center">
                <Flex align="center" className="icon-title">
                  <OrderedListOutlined className="primary-icon" />

                  <Title level={4}>Formatting Suggestions</Title>
                </Flex>

                <Tag color="purple">
                  {data.formatting_suggestions?.length || 0} Suggestions
                </Tag>
              </Flex>

              <div className="suggestions-list">
                {data.formatting_suggestions?.length ? (
                  data.formatting_suggestions.map((suggestion, index) => (
                    <div
                      className="suggestion-item"
                      key={`${suggestion}-${index}`}
                    >
                      <CheckCircleOutlined className="success-icon" />

                      <Text>{suggestion}</Text>
                    </div>
                  ))
                ) : (
                  <Text className="muted-text">
                    No formatting issues found 🎉
                  </Text>
                )}
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* ================= ACTIONABLE STEPS ================= */}

      <Card className="analysis-card actionable-card">
        <Flex className="icon-title" align="start">
          <div className="primary-icon">
            <OrderedListOutlined />
          </div>
          <div>
            <Title level={4}>Recommended Next Steps</Title>

            <Text className="section-description">
              Complete these improvements to make your resume stronger.
            </Text>
          </div>
        </Flex>

        <Row gutter={[16, 16]} className="steps-grid">
          {data.actionable_steps?.length ? (
            data.actionable_steps.map((step, index) => (
              <Col xs={24} sm={12} lg={6} key={`${step}-${index}`}>
                <div className="step-card">
                  <div className="step-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <Title level={5}>Step {index + 1}</Title>

                  <Text className="step-text">{step}</Text>

                  <div className="step-footer">
                    <Text className="action-text">Recommended Action</Text>

                    <RightOutlined />
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Text className="muted-text">No actionable steps available.</Text>
            </Col>
          )}
        </Row>
      </Card>

      {/* ================= BUTTONS ================= */}

      <div className="bottom-actions">
        <Button
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          className="secondary-button"
        >
          Back to Dashboard
        </Button>

        <Button
          type="primary"
          size="large"
          icon={<FileSearchOutlined />}
          onClick={onAnalyzeAnother}
          className="primary-button"
        >
          Analyze Another Resume
        </Button>
      </div>
    </div>
  );
}

/* ================= SKELETON ================= */

function ResumeAnalysisSkeleton() {
  return (
    <div className="resume-analysis-page">
      <Skeleton active paragraph={{ rows: 1 }} />

      <Row gutter={[20, 20]}>
        <Col xs={24} xl={9}>
          <Card className="analysis-card">
            <Skeleton active paragraph={{ rows: 5 }} />
          </Card>
        </Col>

        <Col xs={24} xl={15}>
          <Card className="analysis-card">
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={12}>
          <Card className="analysis-card">
            <Skeleton active paragraph={{ rows: 5 }} />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="analysis-card">
            <Skeleton active paragraph={{ rows: 5 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
