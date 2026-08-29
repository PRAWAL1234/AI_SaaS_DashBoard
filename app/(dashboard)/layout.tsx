"use client";

import { useState } from "react";
import { Layout, Menu, Avatar, Input, Badge, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  FileSearchOutlined,
  BulbOutlined,
  UploadOutlined,
  HistoryOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  LogoutOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "../Routes/routes";
import AuthGuard from "./AuthGuard";

const { Sider, Header, Content } = Layout;

const sidebarItems: MenuProps["items"] = [
  {
    key: ROUTES.DASHBOARD,
    icon: <DashboardOutlined />,
    label: <Link href={ROUTES.DASHBOARD}>Dashboard</Link>,
  },
  {
    key: ROUTES.JOBMATCH,
    icon: <BulbOutlined />,
    label: <Link href={ROUTES.JOBMATCH}>Job Match</Link>,
  },
  {
    key: ROUTES.HISTORY,
    icon: <HistoryOutlined />,
    label: <Link href={ROUTES.HISTORY}>Analysis History</Link>,
  },
  {
    type: "divider",
  },
  {
    key: ROUTES.SETTINGS,
    icon: <SettingOutlined />,
    label: <Link href={ROUTES.SETTINGS}>Settings</Link>,
  },
  {
    key: ROUTES.BILLING,
    icon: <CreditCardOutlined />,
    label: <Link href={ROUTES.BILLING}>Billing</Link>,
    disabled: true,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie.replace("auth_token", "");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = ROUTES.LOGIN;
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link href={ROUTES.PROFILE}>Profile</Link>,
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <Link href={ROUTES.SETTINGS}>Settings</Link>,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <AuthGuard>
      <Layout style={{ minHeight: "100vh" }}>
        {/* ── Sidebar ── */}
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={220}
          style={{
            background: "#ffffff",
            borderRight: "1px solid #F0F0F0",
            position: "fixed",
            height: "100vh",
            left: 0,
            top: 0,
            zIndex: 100,
          }}
        >
          {/* Logo */}
          <div
            style={{
              height: 64,
              display: "flex",
              alignItems: "center",
              padding: collapsed ? "0 24px" : "0 24px",
              borderBottom: "1px solid #F0F0F0",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileSearchOutlined style={{ color: "#fff", fontSize: 16 }} />
            </div>
            {!collapsed && (
              <span style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>
                ResumeAI
              </span>
            )}
          </div>

          {/* Nav Menu */}
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={sidebarItems}
            style={{
              border: "none",
              padding: "12px 0",
              fontSize: 14,
            }}
          />
        </Sider>

        {/* ── Main Area ── */}
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 220,
            transition: "margin-left 0.2s",
          }}
        >
          {/* Header */}
          <Header
            style={{
              background: "#ffffff",
              borderBottom: "1px solid #F0F0F0",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 99,
              height: 64,
            }}
          >
            {/* Left — collapse toggle + search */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#6B7280",
                  padding: 4,
                  display: "flex",
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </button>

              <Input
                prefix={<SearchOutlined style={{ color: "#9CA3AF" }} />}
                placeholder="Search resumes, jobs..."
                style={{
                  width: 280,
                  borderRadius: 8,
                  background: "#F9FAFB",
                  border: "1px solid #F0F0F0",
                }}
              />
            </div>

            {/* Right — bell + avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Badge count={3} size="small">
                <BellOutlined
                  style={{ fontSize: 20, color: "#6B7280", cursor: "pointer" }}
                />
              </Badge>

              <Dropdown menu={{ items: userMenuItems }} trigger={["click"]}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    size={36}
                    style={{
                      background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                      fontWeight: 600,
                    }}
                  >
                    U
                  </Avatar>
                  <div style={{ lineHeight: 1.2 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      User Name
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>
                      Free Plan
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </Header>

          {/* Page Content */}
          <Content
            style={{
              padding: 24,
              background: "#F9FAFB",
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AuthGuard>
  );
}
