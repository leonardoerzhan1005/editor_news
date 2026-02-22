import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import { Highlight } from "@tiptap/extension-highlight"
import { Link } from "@tiptap/extension-link"

import ImageResize from "../../extensions/ImageResize"
import YoutubeEmbed from "../../extensions/YoutubeEmbed"
import FontSize from "../../extensions/FontSize"
import FontFamily from "../../extensions/FontFamily"
import PasteFromWord from "../../extensions/PasteFromWord"

import Toolbar from "./Toolbar"
import TableControls from "./TableControls"

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({ types: ["heading", "paragraph", "youtube", "image"] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      ImageResize,
      YoutubeEmbed,
      FontSize,
      FontFamily,
      PasteFromWord,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            backgroundColor: {
              default: null,
              parseHTML: element => element.getAttribute('data-background-color'),
              renderHTML: attributes => {
                if (!attributes.backgroundColor) {
                  return {}
                }
                return {
                  'data-background-color': attributes.backgroundColor,
                  style: `background-color: ${attributes.backgroundColor}`,
                }
              },
            },
          }
        },
      }),
    ],
    content: `
      <h2>Welcome to the Rich Content Editor!</h2>
      <p>This is a fully functional editor built with React, TypeScript, and Tiptap.</p>
      <p>Try out the features:</p>
      <ul>
        <li>Formatting: <strong>Bold</strong>, <em>Italic</em>, <u>Underline</u></li>
        <li>Lists (Bullet and Ordered)</li>
        <li>Headings (H1, H2)</li>
        <li>Alignment (Left, Center, Right, Justify)</li>
        <li>Images and YouTube Embeds</li>
        <li>Tables</li>
      </ul>
      <p>You can also paste content from Word!</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-4',
      },
    },
  })

  return (
    <div className="border border-gray-300 rounded-xl shadow-sm bg-white overflow-hidden flex flex-col h-full relative">
      <Toolbar editor={editor} />
      <TableControls editor={editor} />
      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  )
}
