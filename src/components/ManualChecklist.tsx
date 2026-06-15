import type { ManualChecklistSection } from "../types";

interface ManualChecklistProps {
  sections: ManualChecklistSection[];
}

export function ManualChecklist({ sections }: ManualChecklistProps) {
  if (sections.length === 0) return null;

  return (
    <section className="manual-checklist">
      <h2 className="section-title">Ручная проверка</h2>
      <p className="section-subtitle">
        Пункты ниже не проверяются автоматически — пройдите их при просмотре
        слайдов.
      </p>
      <ul className="manual-sections">
        {sections.map((section) => (
          <li key={section.id} className="manual-section">
            <div className="manual-section-header">
              <span className="manual-section-title">□ {section.title}</span>
              {section.scope === "per_slide" && (
                <span className="manual-section-badge">каждый слайд</span>
              )}
            </div>
            <p className="manual-section-desc">{section.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
