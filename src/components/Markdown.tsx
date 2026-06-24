import { useMemo } from "react";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: true });

// Renders trusted Markdown authored by the site owner via /admin.
// Content is authored by an authenticated owner only, so we render directly.
const Markdown = ({ source }: { source: string }) => {
  const html = useMemo(() => marked.parse(source || "", { async: false }) as string, [source]);
  return (
    <div
      className="prose-editorial"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Markdown;
