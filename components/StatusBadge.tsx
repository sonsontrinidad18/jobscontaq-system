type StatusBadgeProps = {
  status?: string;
  size?: "sm" | "md";
};

export default function StatusBadge({
  status,
  size = "md",
}: StatusBadgeProps) {
  const value = status || "Pending";

  // ── Color map ──
  const styles: Record<string, { bg: string; color: string; border: string }> = {
    // Deployment statuses
    Deployed: {
      bg: "#F0FDF4",
      color: "#15803D",
      border: "#86EFAC",
    },
    "For Deployment": {
      bg: "#EFF6FF",
      color: "#1D4ED8",
      border: "#93C5FD",
    },
    Processing: {
      bg: "#FFFBEB",
      color: "#92580A",
      border: "#E8C56A",
    },
    // Processing step statuses
    Completed: {
      bg: "#F0FDF4",
      color: "#15803D",
      border: "#86EFAC",
    },
    Pending: {
      bg: "#FFFBEB",
      color: "#92580A",
      border: "#E8C56A",
    },
    // Fallback
    Default: {
      bg: "#F8F8F6",
      color: "#64748B",
      border: "#CBD5E1",
    },
  };

  const matched = styles[value] || styles["Default"];

  const padding = size === "sm"
    ? "0.15rem 0.5rem"
    : "0.2rem 0.65rem";

  const fontSize = size === "sm" ? "0.5625rem" : "0.625rem";

  return (
    <span
      style={{
        display: "inline-block",
        padding,
        borderRadius: "2px",
        fontSize,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: matched.bg,
        color: matched.color,
        border: `1px solid ${matched.border}`,
        fontFamily: "'Inter', sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
}