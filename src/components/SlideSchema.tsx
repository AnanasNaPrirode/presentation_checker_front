import type { Finding, Shape, SlideSize, Severity } from "../types";
import { SEVERITY_COLORS, worstSeverity } from "../utils/severity";

interface SlideSchemaProps {
  slideSize: SlideSize;
  shapes: Shape[];
  findings: Finding[];
  highlightedShapeId: number | null;
  onShapeHover: (shapeId: number | null) => void;
}

function emuToSvg(value: number, slideDim: number, viewDim: number): number {
  return (value / slideDim) * viewDim;
}

export function SlideSchema({
  slideSize,
  shapes,
  findings,
  highlightedShapeId,
  onShapeHover,
}: SlideSchemaProps) {
  const viewW = 960;
  const viewH = (slideSize.height / slideSize.width) * viewW;

  const shapeSeverity = new Map<number, Severity[]>();
  for (const finding of findings) {
    if (finding.shape_id == null) continue;
    const current = shapeSeverity.get(finding.shape_id) ?? [];
    current.push(finding.severity);
    shapeSeverity.set(finding.shape_id, current);
  }

  return (
    <div className="slide-schema">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="slide-schema-svg"
        role="img"
        aria-label="Схема слайда"
      >
        <rect
          x={0}
          y={0}
          width={viewW}
          height={viewH}
          className="slide-schema-bg"
        />
        {shapes.map((shape) => {
          const [left, top, width, height] = shape.bbox;
          const x = emuToSvg(left, slideSize.width, viewW);
          const y = emuToSvg(top, slideSize.height, viewH);
          const w = emuToSvg(width, slideSize.width, viewW);
          const h = emuToSvg(height, slideSize.height, viewH);
          const severities = shapeSeverity.get(shape.shape_id) ?? [];
          const severity = worstSeverity(severities);
          const isHighlighted = highlightedShapeId === shape.shape_id;
          const stroke =
            severity != null ? SEVERITY_COLORS[severity] : "#94a3b8";
          const fill =
            severity != null
              ? `${SEVERITY_COLORS[severity]}22`
              : "rgba(148, 163, 184, 0.12)";

          return (
            <g
              key={shape.shape_id}
              onMouseEnter={() => onShapeHover(shape.shape_id)}
              onMouseLeave={() => onShapeHover(null)}
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill={fill}
                stroke={stroke}
                strokeWidth={isHighlighted ? 3 : 1.5}
                rx={4}
                className={isHighlighted ? "shape-rect shape-rect--active" : "shape-rect"}
              />
              {shape.text && w > 40 && h > 16 && (
                <text
                  x={x + 6}
                  y={y + 14}
                  className="shape-label"
                  fontSize={11}
                  clipPath={`inset(0px)`}
                >
                  {truncate(shape.text, Math.floor(w / 7))}
                </text>
              )}
              {shape.is_placeholder && w > 24 && (
                <text
                  x={x + w - 8}
                  y={y + 12}
                  className="shape-placeholder-tag"
                  fontSize={9}
                  textAnchor="end"
                >
                  {shape.placeholder_type ?? "ph"}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function truncate(text: string, maxLen: number): string {
  const oneLine = text.replace(/\s+/g, " ").trim();
  if (oneLine.length <= maxLen) return oneLine;
  return `${oneLine.slice(0, maxLen - 1)}…`;
}
