import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { LEGAL_PAGES } from "@/legal/content.ts";
import { applyMeta, applyHomeMeta } from "@/lib/seo.ts";

function MarkdownLink({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  if (
    href &&
    href.startsWith("/") &&
    !href.startsWith("/.well-known/") &&
    !href.includes("#")
  ) {
    return (
      <Link to={href} className="u-link">
        {children}
      </Link>
    );
  }
  const external = !!href && /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className="u-link"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

// Wide tables (the cookie table) scroll on their own instead of widening the page.
function ScrollTable({ children }: { children?: React.ReactNode }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4" tabIndex={0} role="region" aria-label="Table (scrolls sideways)">
      <table className="min-w-[40rem]">{children}</table>
    </div>
  );
}

export default function LegalPage({ path }: { path: string }) {
  const page = LEGAL_PAGES.find((p) => p.path === path);

  useEffect(() => {
    if (!page) return;
    applyMeta({
      title: page.docTitle,
      description: `${page.title} for ScreenExtend. ${page.meta}.`,
      path: page.path,
    });

    window.scrollTo(0, 0);

    return () => {
      applyHomeMeta();
    };
  }, [page]);

  if (!page) return null;

  return (
    <div className="container max-w-3xl py-10 lg:py-16">
      <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
        {page.title}
      </h1>
      <p className="mt-2 text-sm text-muted">{page.meta}</p>
      <article className="legal-prose prose mt-8 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-xl prose-p:leading-relaxed prose-strong:font-semibold">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ a: MarkdownLink, table: ScrollTable }}
        >
          {page.body}
        </ReactMarkdown>
      </article>
    </div>
  );
}
