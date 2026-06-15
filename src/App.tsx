import { useState } from "react";
import type { CheckResponse } from "./types";
import { Upload } from "./components/Upload";
import { SlideList } from "./components/SlideList";
import { ReportCopy } from "./components/ReportCopy";
import { ManualChecklist } from "./components/ManualChecklist";
import "./App.css";

export default function App() {
  const [result, setResult] = useState<CheckResponse | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleResult = (data: CheckResponse, name: string) => {
    setResult(data);
    setFileName(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setResult(null);
    setFileName(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1 className="app-title">PPTX Checker</h1>
          <p className="app-subtitle">
            Проверка презентаций для программного комитета
          </p>
        </div>
        {result && (
          <button type="button" className="btn btn-ghost" onClick={handleReset}>
            Новая проверка
          </button>
        )}
      </header>

      <main className="app-main">
        {!result ? (
          <Upload onResult={handleResult} />
        ) : (
          <>
            <div className="file-banner">
              <span className="file-banner-label">Файл:</span>
              <span className="file-banner-name">{fileName}</span>
              <span className="file-banner-meta">
                {result.slides.length} слайд(ов)
              </span>
            </div>
            {result.manual_checklist.length > 0 && (
              <ManualChecklist sections={result.manual_checklist} />
            )}
            <ReportCopy reportText={result.report_text} />
            <SlideList result={result} />
          </>
        )}
      </main>
    </div>
  );
}
