import { Link } from "react-router-dom";

import { KNOWN } from "@/legal/known.ts";

const CONTACTS: { label: string; email: string; security?: boolean }[] = [
  { label: "General support", email: KNOWN.SUPPORT_EMAIL },
  { label: "Privacy and data requests", email: KNOWN.PRIVACY_EMAIL },
  { label: "Abuse and content reports", email: KNOWN.ABUSE_EMAIL },
  { label: "Security vulnerabilities", email: KNOWN.SECURITY_EMAIL, security: true },
  { label: "Legal and copyright (DMCA)", email: KNOWN.LEGAL_EMAIL },
];

const POLICIES: { label: string; to: string }[] = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Acceptable Use Policy", to: "/acceptable-use" },
  { label: "Cookie Policy", to: "/cookies" },
];

export default function Contact() {
  return (
    <section className="border-t border-line py-16 lg:py-24" id="contact">
      <div className="container grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 className="display-lg">Contact</h2>
          <p className="mt-4 text-muted">We reply within 72 hours.</p>
        </div>

        <div className="lg:col-span-8">
          <dl>
            {CONTACTS.map((c) => (
              <div
                key={c.email}
                className="grid border-t border-line py-2 sm:grid-cols-[16rem_1fr] sm:items-center sm:gap-6 sm:py-3"
              >
                <dt className="text-muted">{c.label}</dt>
                <dd>
                  <a href={`mailto:${c.email}`} className="u-link inline-flex min-h-11 items-center break-all sm:min-h-0">
                    {c.email}
                  </a>
                  {c.security && (
                    <span className="text-muted">
                      {" "}
                      (see{" "}
                      <a href="/.well-known/security.txt" className="u-link">
                        security.txt
                      </a>
                      )
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold">Service operator</h3>
              <p className="mt-2 text-muted">
                This website and the ScreenExtend Service are operated by
                Sarvesh Madullapalli, United States.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Policies</h3>
              <ul className="mt-1">
                {POLICIES.map((p) => (
                  <li key={p.to}>
                    <Link to={p.to} className="u-link inline-flex min-h-11 items-center">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
