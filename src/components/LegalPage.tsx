import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { LegalPageDef } from "@/legal/content.ts";

function MarkdownLink({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  if (href && href.startsWith("/") && !href.startsWith("/.well-known/")) {
    return (
      <Link to={href} className="link link-primary">
        {children}
      </Link>
    );
  }
  const external = !!href && /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className="link link-primary"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function LegalPage({ page }: { page: LegalPageDef }) {
  useEffect(() => {
    document.title = page.docTitle;

    const canonicalHref = `https://screenextend.app${page.path}`;
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;

    let robots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "index,follow";

    window.scrollTo(0, 0);

    return () => {
      document.title = "ScreenExtend";
    };
  }, [page]);

  return (
    <main className="container max-w-3xl py-10 lg:py-16">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
        {page.title}
      </h1>
      <p className="mt-2 text-sm text-base-content/60">{page.meta}</p>
      <article className="prose prose-sm mt-8 max-w-none prose-headings:font-semibold prose-a:no-underline dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ a: MarkdownLink }}
        >
          {page.body}
        </ReactMarkdown>
      </article>
    </main>
  );
}
