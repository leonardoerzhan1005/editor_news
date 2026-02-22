import { useState } from "react"
import { Editor } from "@tiptap/react"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Image as ImageIcon,
  Youtube,
  Table as TableIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Quote,
  Undo,
  Redo,
  Type,
  Pilcrow
} from "lucide-react"
import { uploadImage } from "../../utils/uploadImage"
import YoutubeModal from "./YoutubeModal"
import ImageModal from "./ImageModal"

interface ToolbarProps {
  editor: Editor | null
}

export default function Toolbar({ editor }: ToolbarProps) {
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  if (!editor) return null

  const handleImageSubmit = (src: string) => {
    editor.chain().focus().setImage({ src }).run()
  }

  const handleYoutubeSubmit = (url: string) => {
    // @ts-ignore
    editor.chain().focus().setYoutubeVideo({ src: url }).run()
  }

  return (
    <>
      <YoutubeModal 
        isOpen={isYoutubeModalOpen} 
        onClose={() => setIsYoutubeModalOpen(false)} 
        onSubmit={handleYoutubeSubmit} 
      />
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSubmit={handleImageSubmit}
      />
      <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1 sticky top-0 z-10">
      <div className="flex items-center gap-1 pr-2 border-r border-gray-300 mr-2">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50"
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1 pr-2 border-r border-gray-300 mr-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-200 text-blue-600" : ""}`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-200 text-blue-600" : ""}`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("underline") ? "bg-gray-200 text-blue-600" : ""}`}
          title="Underline"
        >
          <Underline size={18} />
        </button>
        <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Strikethrough"
        >
            <Strikethrough size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1 pr-2 border-r border-gray-300 mr-2">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200 text-blue-600" : ""}`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-blue-600" : ""}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200 text-blue-600" : ""}`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 4 }) ? "bg-gray-200 text-blue-600" : ""}`}
          title="Heading 4"
        >
          <Heading4 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 5 }) ? "bg-gray-200 text-blue-600" : ""}`}
          title="Heading 5"
        >
          <Heading5 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("paragraph") ? "bg-gray-200 text-blue-600" : ""}`}
          title="Paragraph"
        >
          <Pilcrow size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1 pr-2 border-r border-gray-300 mr-2">
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          value={editor.getAttributes('textStyle').fontFamily || ''}
          className="p-1 rounded border border-gray-300 text-sm w-24 focus:outline-none focus:border-blue-500"
          title="Font Family"
        >
          <option value="">Default</option>
          <option value="Inter, sans-serif">Inter</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Courier New, monospace">Courier</option>
        </select>
        
        <select
          onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
          value={editor.getAttributes('textStyle').fontSize || ''}
          className="p-1 rounded border border-gray-300 text-sm w-20 focus:outline-none focus:border-blue-500"
          title="Font Size"
        >
          <option value="">Size</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="30px">30px</option>
        </select>

        <input
            type="color"
            onInput={(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
            value={editor.getAttributes('textStyle').color || '#000000'}
            className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
            title="Text Color"
        />
      </div>

      <div className="flex items-center gap-1 pr-2 border-r border-gray-300 mr-2">
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200 text-blue-600" : ""}`}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200 text-blue-600" : ""}`}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200 text-blue-600" : ""}`}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Justify"
        >
            <AlignJustify size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1 pr-2 border-r border-gray-300 mr-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("bulletList") ? "bg-gray-200 text-blue-600" : ""}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-gray-200 ${editor.isActive("orderedList") ? "bg-gray-200 text-blue-600" : ""}`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsImageModalOpen(true)}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Insert Image"
        >
          <ImageIcon size={18} />
        </button>
        <button
          onClick={() => setIsYoutubeModalOpen(true)}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Insert YouTube"
        >
          <Youtube size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="p-1.5 rounded hover:bg-gray-200"
          title="Insert Table"
        >
          <TableIcon size={18} />
        </button>
      </div>
    </div>
    </>
  )
}
