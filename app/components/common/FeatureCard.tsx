import { Card } from "antd";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card
      variant="borderless"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)", borderRadius: 12 }}
      styles={{ body: { padding: 24 } }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "#EEF2FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          color: "#4F46E5",
          fontSize: 18,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 8,
          color: "#111827",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
        {description}
      </p>
    </Card>
  );
}
