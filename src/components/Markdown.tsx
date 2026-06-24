import { useMemo } from "react";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: true });

// Posts authored via /admin are stored as HTML (TipTap editor). Older posts
// were written in Markdown. Detect which and render accordingly. Content comes
// from the authenticated owner only, so we render it directly.
const looksLikeHtml = (s: string) => /<\/?[a-z][\s\S]*>/i.test(s);

const Markdown = ({ source }: { source: string }) => {
  const html = useMemo(() => {
    const src = source || "";
    return looksLikeHtml(src)
      ? src
      : (marked.parse(src, { async: false }) as string);
  }, [source]);
  return (
    <div
      className="prose-editorial"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Markdown;
