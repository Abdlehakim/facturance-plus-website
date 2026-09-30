import Link from "next/link";
import Markdown, { type Components } from "react-markdown";

/**
 * Renders an article body, with the classes the hand-built content blocks used
 * before the articles moved to Markdown, so the page looks the same.
 *
 * Raw HTML in Markdown is not enabled: react-markdown ignores it unless a
 * rehype-raw plugin is added, and none is. Article files stay data.
 *
 * Each renderer takes only the props it needs rather than spreading the rest,
 * which keeps react-markdown's `node` off the DOM elements.
 */

const HEADING_2 = "mt-10 text-2xl font-bold tracking-tight text-[#0b294d]";
const HEADING_3 = "mt-8 text-xl font-bold tracking-tight text-[#0b294d]";
const PARAGRAPH = "mt-5 leading-8 text-muted-foreground";
const LIST_ITEM = "leading-7 text-muted-foreground";
const LINK =
  "rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * The page already owns the article's <h1>, so a "#" in the body renders as an
 * h2. That keeps one h1 per document without silently dropping the text.
 */
const components: Components = {
  h1: ({ children }) => <h2 className={HEADING_2}>{children}</h2>,
  h2: ({ children }) => <h2 className={HEADING_2}>{children}</h2>,
  h3: ({ children }) => <h3 className={HEADING_3}>{children}</h3>,
  h4: ({ children }) => <h4 className={HEADING_3}>{children}</h4>,

  p: ({ children }) => <p className={PARAGRAPH}>{children}</p>,

  ul: ({ children }) => (
    <ul className="mt-5 grid gap-2 pl-5 marker:text-primary [&>li]:list-disc">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 grid gap-2 pl-5 marker:text-primary [&>li]:list-decimal">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className={LIST_ITEM}>{children}</li>,

  // The callout the content blocks used to render: the first paragraph carries
  // the bold title, the rest is the body. Paragraph spacing is reset inside the
  // box, since the default one is tuned for running text.
  blockquote: ({ children }) => (
    <aside className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 [&>p]:mt-2 [&>p]:leading-7 [&>p:first-child]:mt-0">
      {children}
    </aside>
  ),

  strong: ({ children }) => (
    <strong className="font-bold text-[#0b294d]">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,

  code: ({ children }) => (
    <code className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-[0.9em] text-[#0b294d]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mt-5 overflow-x-auto rounded-xl bg-[#0b294d] p-4 text-sm text-blue-50">
      {children}
    </pre>
  ),

  hr: () => <hr className="mt-8" />,

  // Root-relative targets stay inside the site and go through next/link;
  // anything else is treated as leaving it.
  a: ({ href, children }) => {
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} className={LINK}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={LINK}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  },
};

export function MarkdownContent({ content }: { content: string }) {
  return <Markdown components={components}>{content}</Markdown>;
}
