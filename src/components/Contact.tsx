import type { ReactNode } from "react";

import { Link } from "react-router-dom";

import Reveal from "@/components/Reveal.tsx";
import { KNOWN } from "@/legal/content.ts";

const CARD =
  "h-full rounded-box border border-base-content/10 bg-base-100/50 p-6 backdrop-blur-sm transition-colors duration-200 hover:border-primary/40";

const CONTACTS: { label: string; email: string; note?: ReactNode }[] = [
  { label: "General support", email: KNOWN.SUPPORT_EMAIL },
  { label: "Privacy & data requests", email: KNOWN.PRIVACY_EMAIL },
  { label: "Abuse & content reports", email: KNOWN.ABUSE_EMAIL },
  {
    label: "Security vulnerability reports",
    email: KNOWN.SECURITY_EMAIL,
    note: (
      <>
        {" "}
        (see our{" "}
        <a href="/.well-known/security.txt" className="link link-primary">
          security.txt
        </a>
        )
      </>
    ),
  },
  { label: "Legal & copyright (DMCA) notices", email: KNOWN.LEGAL_EMAIL },
];

const POLICIES: { label: string; to: string }[] = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Acceptable Use Policy", to: "/acceptable-use" },
  { label: "Cookie Policy", to: "/cookies" },
];

export default function Contact() {
  return (
    <section className="py-8 lg:py-20" id="contact">
      <div className="container">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-semibold text-base-content">Contact</h2>
          <span className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-info" />
          <p className="mt-4 max-w-xl text-base text-base-content/70">
            Questions, reports, or requests? Reach the right team directly. We'll respond within 3 business days.
          </p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          <Reveal delay={0} className="h-full">
            <div className={CARD}>
              <h3 className="text-xl font-semibold">Service operator</h3>
              <p className="mt-3 text-base text-base-content/80">
                This website and the ScreenExtend Service are operated by:
              </p>
              <p className="mt-2 text-base font-medium">SARVESH MADULLAPALLI</p>
              <p className="text-base text-base-content/70">United States</p>
            </div>
          </Reveal>
          <Reveal delay={80} className="h-full">
            <div className={CARD}>
              <h3 className="text-xl font-semibold">Policies</h3>
              <ul className="mt-3 space-y-2 text-base">
                {POLICIES.map((policy) => (
                  <li key={policy.to}>
                    <Link to={policy.to} className="link link-primary">
                      {policy.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={160} className="h-full lg:col-span-2">
            <div className={CARD}>
              <h3 className="text-xl font-semibold">How to reach us</h3>
              <ul className="mt-4 grid gap-3 text-base sm:grid-cols-2">
                {CONTACTS.map((contact) => (
                  <li key={contact.email}>
                    <span className="font-medium">{contact.label}:</span>{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className="link link-primary"
                    >
                      {contact.email}
                    </a>
                    {contact.note}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
