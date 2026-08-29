"use client";

import { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ROUTES } from "../../Routes/routes";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Styles object for cleaner code
  const styles = {
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 24px", // Mobile-friendly padding
      borderBottom: "1px solid #F0F0F0",
      background: "#fff",
      position: "sticky" as const, // Makes it sticky
      top: 0,
      zIndex: 1000, // Ensures it stays on top of other content
    },
    desktopMenu: {
      display: "flex",
      gap: 32,
      fontSize: 14,
      color: "#374151",
    },
    desktopButtons: {
      display: "flex",
      gap: 12,
      alignItems: "center",
    },
    mobileMenuBtn: {
      display: "none", // Hidden on desktop via CSS below
    },
    drawerLink: {
      display: "block",
      padding: "12px 0",
      fontSize: 16,
      color: "#374151",
      borderBottom: "1px solid #F0F0F0",
    },
  };

  return (
    <>
      {/* CSS Injection to handle responsiveness without heavy external CSS files */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-links,
          .desktop-auth {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>

      <nav style={styles.nav}>
        {/* Logo */}
        <div style={{ fontWeight: 700, fontSize: 20, color: "#4F46E5" }}>
          ResumeAI
        </div>

        {/* Desktop Navigation Links */}
        <div className="desktop-links" style={styles.desktopMenu}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="desktop-auth" style={styles.desktopButtons}>
          <Link href={ROUTES.LOGIN} style={{ fontSize: 14, color: "#374151" }}>
            Log in
          </Link>
          <Link href={ROUTES.SIGNUP}>
            <Button type="primary">Try for Free</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="mobile-toggle" style={{ display: "none" }}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 20 }} />}
            onClick={() => setOpen(true)}
          />
        </div>
      </nav>

      {/* Mobile Sidebar / Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        size={280}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <a
            href="#features"
            style={styles.drawerLink}
            onClick={() => setOpen(false)}
          >
            Features
          </a>
          <a
            href="#pricing"
            style={styles.drawerLink}
            onClick={() => setOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#about"
            style={styles.drawerLink}
            onClick={() => setOpen(false)}
          >
            About
          </a>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Link href={ROUTES.LOGIN} onClick={() => setOpen(false)}>
              <Button block style={{ fontSize: 14, color: "#374151" }}>
                Log in
              </Button>
            </Link>
            <Link href={ROUTES.SIGNUP} onClick={() => setOpen(false)}>
              <Button type="primary" block>
                Try for Free
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    </>
  );
}
