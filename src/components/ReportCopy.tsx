import { useState } from "react";

interface ReportCopyProps {
  reportText: string;
}

export function ReportCopy({ reportText }: ReportCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = reportText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="report-copy">
      <div className="report-copy-header">
        <h2 className="section-title">Отчёт</h2>
        <button type="button" className="btn btn-secondary" onClick={() => void handleCopy()}>
          {copied ? "Скопировано" : "Копировать в буфер"}
        </button>
      </div>
      <pre className="report-text">{reportText}</pre>
    </section>
  );
}
