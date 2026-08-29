import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import { antdTheme } from "../app/Lib/antdTheme";
import QueryProvider from "@/API/query-client";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeAI - AI-Powered Resume Analyzer",
  description: "Analyze your resume with AI precision",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AntdRegistry>
            <ConfigProvider theme={antdTheme}>
              <App>{children}</App>
            </ConfigProvider>
          </AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
