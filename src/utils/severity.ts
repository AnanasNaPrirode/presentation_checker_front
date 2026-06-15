import type { Severity } from "../types";

export const SEVERITY_COLORS: Record<Severity, string> = {
  ok: "#22c55e",
  warning: "#eab308",
  error: "#ef4444",
  info: "#64748b",
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  ok: "OK",
  warning: "Предупреждение",
  error: "Ошибка",
  info: "Инфо",
};

export const SEVERITY_BG: Record<Severity, string> = {
  ok: "rgba(34, 197, 94, 0.12)",
  warning: "rgba(234, 179, 8, 0.15)",
  error: "rgba(239, 68, 68, 0.12)",
  info: "rgba(100, 116, 139, 0.12)",
};

export function worstSeverity(
  severities: Severity[],
): Severity | null {
  if (severities.includes("error")) return "error";
  if (severities.includes("warning")) return "warning";
  if (severities.includes("info")) return "info";
  if (severities.includes("ok")) return "ok";
  return null;
}
