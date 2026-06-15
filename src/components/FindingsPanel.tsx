import type { Finding } from "../types";
import { SEVERITY_BG, SEVERITY_COLORS, SEVERITY_LABELS } from "../utils/severity";

interface FindingsPanelProps {
  findings: Finding[];
  highlightedShapeId: number | null;
  onHighlight: (shapeId: number | null) => void;
  title?: string;
  emptyText?: string;
}

export function FindingsPanel({
  findings,
  highlightedShapeId,
  onHighlight,
  title = "Находки",
  emptyText = "Нарушений не обнаружено",
}: FindingsPanelProps) {
  if (findings.length === 0) {
    return (
      <aside className="findings-panel">
        <h3 className="findings-panel-title">{title}</h3>
        <p className="findings-empty">{emptyText}</p>
      </aside>
    );
  }

  return (
    <aside className="findings-panel">
      <h3 className="findings-panel-title">{title}</h3>
      <ul className="findings-list">
        {findings.map((finding, idx) => {
          const isActive =
            finding.shape_id != null && finding.shape_id === highlightedShapeId;
          return (
            <li key={`${finding.rule_id}-${idx}`}>
              <button
                type="button"
                className={`finding-item${isActive ? " finding-item--active" : ""}`}
                style={{
                  borderLeftColor: SEVERITY_COLORS[finding.severity],
                  background: isActive
                    ? SEVERITY_BG[finding.severity]
                    : undefined,
                }}
                onMouseEnter={() => onHighlight(finding.shape_id)}
                onMouseLeave={() => onHighlight(null)}
                onClick={() =>
                  onHighlight(
                    finding.shape_id === highlightedShapeId
                      ? null
                      : finding.shape_id,
                  )
                }
              >
                <span
                  className="finding-severity"
                  style={{ color: SEVERITY_COLORS[finding.severity] }}
                >
                  {SEVERITY_LABELS[finding.severity]}
                </span>
                <span className="finding-rule">{finding.rule_id}</span>
                <p className="finding-message">{finding.message}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
