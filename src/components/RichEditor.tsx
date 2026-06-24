import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

// A clean WYSIWYG editor (TipTap) for the Journal admin. The owner sees real
// formatting — bold, italic, headings, lists, quotes, links, images — instead
// of Markdown symbols. Content is stored as HTML in the post body.

type Props = {
  value: string;
  onChange: (html: string) => void;
  // Upload a pasted/selected image and return its hosted URL (Cloudinary).
  onUploadImage?: (file: File) => Promise<string>;
};

// ── Toolbar button ───────────────────────────────────────────────
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
    className={`grid h-8 min-w-8 place-items-center rounded-md px-1.5 text-[14px] leading-none transition-colors disabled:opacity-30 ${
      active ? "bg-ink text-paper" : "text-ink hover:bg-cloud"
    }`}
  >
    {children}
  </button>
);

const Divider = () => <span className="mx-1 h-5 w-px bg-line" />;

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
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim() })
      .run();
  };

  return (
    <div className="sticky top-16 z-10 -mx-6 mb-5 flex flex-wrap items-center gap-0.5 border-b border-line bg-paper/95 px-6 py-2 backdrop-blur md:-mx-8 md:px-8">
      <Btn
        title="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <span className="font-bold">B</span>
      </Btn>
      <Btn
        title="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <span className="font-serif italic">I</span>
      </Btn>
      <Btn
        title="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </Btn>
      <Btn
        title="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <span className="line-through">S</span>
      </Btn>

      <Divider />

      <Btn
        title="Heading"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <span className="text-[13px] font-semibold">H2</span>
      </Btn>
      <Btn
        title="Subheading"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <span className="text-[13px] font-semibold">H3</span>
      </Btn>

      <Divider />

      <Btn
        title="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        ☰
      </Btn>
      <Btn
        title="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <span className="text-[12px] font-semibold">1.</span>
      </Btn>
      <Btn
        title="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        ❝
      </Btn>

      <Divider />

      <Btn title="Add link" active={editor.isActive("link")} onClick={setLink}>
        🔗
      </Btn>
      {onPickImage && (
        <Btn title="Insert image" disabled={uploading} onClick={onPickImage}>
          {uploading ? <span className="text-[11px]">…</span> : "🖼"}
        </Btn>
      )}

      <Divider />

      <Btn
        title="Undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        ↺
      </Btn>
      <Btn
        title="Redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        ↻
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
