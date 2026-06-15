export type Severity = "ok" | "warning" | "error" | "info";
export type FindingCategory = "auto" | "heuristic" | "manual";

export interface SlideSize {
  width: number;
  height: number;
}

export interface Shape {
  shape_id: number;
  type: string;
  bbox: [number, number, number, number];
  text: string;
  is_placeholder: boolean;
  placeholder_type: string | null;
}

export interface Finding {
  rule_id: string;
  severity: Severity;
  message: string;
  category: FindingCategory;
  shape_id: number | null;
  bbox: [number, number, number, number] | null;
}

export interface Slide {
  index: number;
  shapes: Shape[];
  findings: Finding[];
}

export interface ManualChecklistSection {
  id: string;
  title: string;
  description: string;
  scope: "per_slide" | "presentation";
}

export interface CheckSummary {
  errors: number;
  warnings: number;
  total_findings: number;
}

export interface CheckResponse {
  slide_size: SlideSize;
  slides: Slide[];
  presentation_findings: Finding[];
  manual_checklist: ManualChecklistSection[];
  report_text: string;
  summary: CheckSummary;
}
