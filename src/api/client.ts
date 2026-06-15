import type { CheckResponse } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function checkPresentation(file: File): Promise<CheckResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/check`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = `Ошибка ${response.status}`;
    try {
      const body = await response.json();
      if (typeof body.detail === "string") {
        message = body.detail;
      } else if (Array.isArray(body.detail)) {
        message = body.detail.map((d: { msg?: string }) => d.msg).join("; ");
      }
    } catch {
      // keep default message
    }
    throw new Error(message);
  }

  return response.json() as Promise<CheckResponse>;
}
