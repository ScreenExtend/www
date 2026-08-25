export const KNOWN = {
  EFFECTIVE_DATE: "June 13, 2026",
  SUPPORT_EMAIL: "support@screenextend.app",
  PRIVACY_EMAIL: "privacy@screenextend.app",
  ABUSE_EMAIL: "abuse@screenextend.app",
  SECURITY_EMAIL: "security@screenextend.app",
  LEGAL_EMAIL: "legal@screenextend.app",
  MIN_AGE: "13 (16 in the EEA/UK)",
} as const;

export interface LegalPageDef {
  path: string;
  title: string;
  docTitle: string;
  meta: string;
  body: string;
}

export const LEGAL_PATHS = [
  "/privacy",
  "/terms",
  "/acceptable-use",
  "/cookies",
] as const;
