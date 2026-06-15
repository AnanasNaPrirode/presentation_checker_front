import { useState } from "react";
import type { CheckResponse } from "../types";
import { FindingsPanel } from "./FindingsPanel";
import { SlideCard } from "./SlideCard";

interface SlideListProps {
  result: CheckResponse;
}

export function SlideList({ result }: SlideListProps) {
  const [presentationHighlight, setPresentationHighlight] = useState<
    number | null
  >(null);

  return (
    <div className="slide-list">
      <SummaryBar summary={result.summary} />

      {result.presentation_findings.length > 0 && (
        <section className="presentation-findings">
          <FindingsPanel
            title="Презентация (целиком)"
            findings={result.presentation_findings}
            highlightedShapeId={presentationHighlight}
            onHighlight={setPresentationHighlight}
          />
        </section>
      )}

      {result.slides.map((slide) => (
        <SlideCard
          key={slide.index}
          slide={slide}
          slideSize={result.slide_size}
        />
      ))}
    </div>
  );
}

function SummaryBar({ summary }: { summary: CheckResponse["summary"] }) {
  return (
    <div className="summary-bar">
      <div className="summary-stats">
        <span className="summary-stat summary-stat--error">
          {summary.errors} ошибок
        </span>
        <span className="summary-stat summary-stat--warning">
          {summary.warnings} предупреждений
        </span>
        <span className="summary-stat">{summary.total_findings} всего</span>
      </div>
    </div>
  );
}
