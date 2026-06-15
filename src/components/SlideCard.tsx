import { useState } from "react";
import type { Finding, Slide, SlideSize } from "../types";
import { worstSeverity } from "../utils/severity";
import { SEVERITY_COLORS } from "../utils/severity";
import { FindingsPanel } from "./FindingsPanel";
import { SlideSchema } from "./SlideSchema";

interface SlideCardProps {
  slide: Slide;
  slideSize: SlideSize;
}

export function SlideCard({ slide, slideSize }: SlideCardProps) {
  const [highlightedShapeId, setHighlightedShapeId] = useState<number | null>(
    null,
  );

  const worst = worstSeverity(slide.findings.map((f) => f.severity));

  return (
    <article className="slide-card" id={`slide-${slide.index}`}>
      <header className="slide-card-header">
        <h2 className="slide-card-title">Слайд {slide.index}</h2>
        <SlideBadge findings={slide.findings} worst={worst} />
      </header>
      <div className="slide-card-body">
        <SlideSchema
          slideSize={slideSize}
          shapes={slide.shapes}
          findings={slide.findings}
          highlightedShapeId={highlightedShapeId}
          onShapeHover={setHighlightedShapeId}
        />
        <FindingsPanel
          findings={slide.findings}
          highlightedShapeId={highlightedShapeId}
          onHighlight={setHighlightedShapeId}
        />
      </div>
    </article>
  );
}

function SlideBadge({
  findings,
  worst,
}: {
  findings: Finding[];
  worst: ReturnType<typeof worstSeverity>;
}) {
  if (findings.length === 0) {
    return <span className="slide-badge slide-badge--ok">OK</span>;
  }
  const color = worst ? SEVERITY_COLORS[worst] : "#94a3b8";
  return (
    <span className="slide-badge" style={{ color, borderColor: color }}>
      {findings.length} {pluralFindings(findings.length)}
    </span>
  );
}

function pluralFindings(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "находка";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return "находки";
  }
  return "находок";
}
