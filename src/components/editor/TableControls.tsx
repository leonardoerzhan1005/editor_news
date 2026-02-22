import { Editor } from '@tiptap/react'
import {
  Table,
  Trash2,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowLeft,
  Split,
  Merge,
  Rows,
  Columns,
  Grid,
  PaintBucket
} from 'lucide-react'

interface TableControlsProps {
  editor: Editor | null
}

export default function TableControls({ editor }: TableControlsProps) {
  if (!editor || !editor.isActive('table')) return null

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200 items-center overflow-x-auto">
      <span className="text-xs font-semibold text-gray-500 mr-2 flex items-center gap-1 whitespace-nowrap">
        <Table size={14} /> Table
      </span>
      
      <div className="h-4 w-px bg-gray-300 mx-1"></div>

      {/* Columns */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="p-1 rounded hover:bg-gray-200 text-gray-700"
          title="Add Column Before"
        >
          <ArrowLeft size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="p-1 rounded hover:bg-gray-200 text-gray-700"
          title="Add Column After"
        >
          <ArrowRight size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className="p-1 rounded hover:bg-red-100 text-red-600"
          title="Delete Column"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1"></div>

      {/* Rows */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="p-1 rounded hover:bg-gray-200 text-gray-700"
          title="Add Row Before"
        >
          <ArrowUp size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="p-1 rounded hover:bg-gray-200 text-gray-700"
          title="Add Row After"
        >
          <ArrowDown size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteRow().run()}
          className="p-1 rounded hover:bg-red-100 text-red-600"
          title="Delete Row"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1"></div>

      {/* Merge/Split */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => editor.chain().focus().mergeCells().run()}
          className="p-1 rounded hover:bg-gray-200 text-gray-700"
          title="Merge Cells"
        >
          <Merge size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().splitCell().run()}
          className="p-1 rounded hover:bg-gray-200 text-gray-700"
          title="Split Cell"
        >
          <Split size={14} />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1"></div>

      {/* Headers */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('tableHeaderRow') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          title="Toggle Header Row"
        >
          <Rows size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('tableHeaderColumn') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          title="Toggle Header Column"
        >
          <Columns size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderCell().run()}
          className={`p-1 rounded hover:bg-gray-200 ${editor.isActive('tableHeaderCell') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
          title="Toggle Header Cell"
        >
          <Grid size={14} />
        </button>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1"></div>

      {/* Cell Color */}
      <div className="flex items-center gap-1 relative group">
         <div className="p-1 rounded hover:bg-gray-200 text-gray-700 cursor-pointer flex items-center">
            <PaintBucket size={14} />
            <input
              type="color"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              onInput={(e) => editor.chain().focus().setCellAttribute('backgroundColor', (e.target as HTMLInputElement).value).run()}
              title="Cell Background Color"
            />
         </div>
      </div>

      <div className="h-4 w-px bg-gray-300 mx-1"></div>

      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        className="p-1 rounded hover:bg-red-100 text-red-600"
        title="Delete Table"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
