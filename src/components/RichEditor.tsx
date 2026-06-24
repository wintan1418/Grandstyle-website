import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

// A clean WYSIWYG editor (TipTap) for the Journal admin, styled to the
// "Magazine" admin design. The owner sees real formatting — bold, italic,
// headings, lists, quotes, links, images — instead of Markdown symbols.
// Content is stored as HTML in the post body.

type Props = {
  value: string;
  onChange: (html: string) => void;
  // Upload a selected image and return its hosted URL (Cloudinary).
  onUploadImage?: (file: File) => Promise<string>;
};

// ── Inline line icons (16px, stroke 1.6, currentColor) ───────────
const ic = "h-[16px] w-[16px]";
const IconBulletList = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={ic}>
    <path d="M8 6h12M8 12h12M8 18h12" />
    <circle cx="3.5" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="3.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="3.5" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconQuote = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={ic}>
    <path d="M7.5 6C5.6 6 4 7.6 4 9.5S5.6 13 7.5 13c.2 0 .4 0 .6-.1-.4 1.6-1.7 2.8-3.1 3.1-.3.1-.5.4-.4.7.1.3.4.5.7.4 2.7-.6 4.7-3 4.7-5.9V9.5C10 7.6 9.4 6 7.5 6Zm9 0C14.6 6 13 7.6 13 9.5S14.6 13 16.5 13c.2 0 .4 0 .6-.1-.4 1.6-1.7 2.8-3.1 3.1-.3.1-.5.4-.4.7.1.3.4.5.7.4 2.7-.6 4.7-3 4.7-5.9V9.5C19 7.6 18.4 6 16.5 6Z" />
  </svg>
);
const IconLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ic}>
    <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
  </svg>
);
const IconImage = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ic}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8.5" cy="9.5" r="1.6" />
    <path d="M21 16l-5-5L4 20" />
  </svg>
);
const IconUndo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ic}>
    <path d="M9 7 4 12l5 5" />
    <path d="M4 12h11a5 5 0 0 1 0 10h-1" />
  </svg>
);
const IconRedo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ic}>
    <path d="M15 7l5 5-5 5" />
    <path d="M20 12H9a5 5 0 0 0 0 10h1" />
  </svg>
);

// ── Toolbar button (magazine style) ──────────────────────────────
const Btn = ({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    aria-pressed={active}
    disabled={disabled}
    onMouseDown={(e) => e.preventDefault()} // keep editor selection
    onClick={onClick}
    className={`inline-flex h-[30px] min-w-[30px] items-center justify-center px-1 leading-none transition-colors duration-150 disabled:opacity-30 ${
      active
        ? "border-b-2 border-[#A6303A] text-[#231C16]"
        : "border-b-2 border-transparent text-[#6e5f4c] hover:text-[#231C16]"
    }`}
  >
    {children}
  </button>
);

const Divider = () => <span className="mx-[6px] h-4 w-px bg-[#d8cab4]" />;

const Toolbar = ({
  editor,
  onPickImage,
  uploading,
}: {
  editor: Editor;
  onPickImage?: () => void;
  uploading: boolean;
}) => {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div className="sticky top-0 z-10 mb-5 flex flex-wrap items-center gap-[2px] border-b border-[#DCD0BF] bg-[#ECE5D9] py-1.5">
      <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <span className="text-[14px] font-bold">B</span>
      </Btn>
      <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <span className="font-['Spectral'] text-[15px] italic">I</span>
      </Btn>
      <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <span className="text-[14px] underline">U</span>
      </Btn>
      <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <span className="text-[14px] line-through">S</span>
      </Btn>

      <Divider />

      <Btn title="Heading" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <span className="text-[13px] font-semibold">H2</span>
      </Btn>
      <Btn title="Subheading" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <span className="text-[12px] font-semibold">H3</span>
      </Btn>

      <Divider />

      <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <IconBulletList />
      </Btn>
      <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <span className="text-[12px] font-semibold">1.</span>
      </Btn>
      <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <IconQuote />
      </Btn>

      <Divider />

      <Btn title="Add link" active={editor.isActive("link")} onClick={setLink}>
        <IconLink />
      </Btn>
      {onPickImage && (
        <Btn title="Insert image" disabled={uploading} onClick={onPickImage}>
          {uploading ? <span className="text-[11px]">…</span> : <IconImage />}
        </Btn>
      )}

      <Divider />

      <Btn title="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <IconUndo />
      </Btn>
      <Btn title="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <IconRedo />
      </Btn>
    </div>
  );
};

// ── Editor ───────────────────────────────────────────────────────
const RichEditor = ({ value, onChange, onUploadImage }: Props) => {
  const lastEmitted = useRef(value);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        },
      }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg" } }),
      Placeholder.configure({ placeholder: "Tell the story…" }),
    ],
    content: value || "",
    editorProps: {
      attributes: { class: "prose-editorial min-h-[440px] focus:outline-none" },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastEmitted.current = html;
      onChange(html);
    },
  });

  // Push externally-changed content (new draft / switching posts) into the editor.
  useEffect(() => {
    if (!editor) return;
    if (value !== lastEmitted.current) {
      lastEmitted.current = value;
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  const handleFile = async (file: File) => {
    if (!onUploadImage || !editor) return;
    setUploading(true);
    try {
      const url = await onUploadImage(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch {
      /* parent surfaces the error via its own handler */
    } finally {
      setUploading(false);
    }
  };

  if (!editor) return null;

  return (
    <div>
      <Toolbar
        editor={editor}
        uploading={uploading}
        onPickImage={onUploadImage ? () => fileRef.current?.click() : undefined}
      />
      <EditorContent editor={editor} />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default RichEditor;
