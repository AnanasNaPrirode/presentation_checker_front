import { useRef, useState } from "react";
import { checkPresentation } from "../api/client";
import type { CheckResponse } from "../types";

interface UploadProps {
  onResult: (result: CheckResponse, fileName: string) => void;
  disabled?: boolean;
}

export function Upload({ onResult, disabled }: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pptx")) {
      setError("Выберите файл .pptx");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const result = await checkPresentation(file);
      onResult(result, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось проверить файл");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <section className="upload">
      <div
        className={`upload-dropzone${loading ? " upload-dropzone--loading" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (!loading && !disabled) {
            void handleFile(e.dataTransfer.files[0]);
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          hidden
          disabled={loading || disabled}
          onChange={(e) => void handleFile(e.target.files?.[0])}
        />
        {loading ? (
          <div className="upload-loading">
            <span className="spinner" />
            <p>Проверяем презентацию…</p>
          </div>
        ) : (
          <>
            <p className="upload-title">Загрузите презентацию</p>
            <p className="upload-hint">Перетащите .pptx сюда или выберите файл</p>
            <button
              type="button"
              className="btn btn-primary"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
            >
              Выбрать файл
            </button>
          </>
        )}
      </div>
      {error && <p className="upload-error">{error}</p>}
    </section>
  );
}
