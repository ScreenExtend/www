import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { LegalPageDef } from "@/legal/content.ts";
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
