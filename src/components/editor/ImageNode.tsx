import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Resizable } from 're-resizable'

export default function ImageNode(props: NodeViewProps) {
  const { node, updateAttributes, selected } = props

  return (
    <NodeViewWrapper className={`my-4 relative flex ${selected ? 'z-10' : ''}`} style={{ justifyContent: node.attrs.textAlign === 'center' ? 'center' : node.attrs.textAlign === 'right' ? 'flex-end' : 'flex-start' }}>
      <Resizable
        size={{ width: node.attrs.width, height: node.attrs.height }}
        onResizeStop={(e, direction, ref, d) => {
          updateAttributes({
            width: ref.style.width,
            height: ref.style.height,
          })
        }}
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: true,
          topRight: false,
          bottomRight: true,
          bottomLeft: true,
          topLeft: false,
        }}
        lockAspectRatio={true}
        className={`transition-all relative group ${selected ? 'ring-2 ring-blue-500 rounded-lg' : 'hover:ring-2 hover:ring-blue-300 rounded-lg'}`}
        handleStyles={{
            bottomRight: { bottom: -6, right: -6, width: 12, height: 12, background: '#3b82f6', borderRadius: '50%', zIndex: 20, border: '2px solid white' },
            bottomLeft: { bottom: -6, left: -6, width: 12, height: 12, background: '#3b82f6', borderRadius: '50%', zIndex: 20, border: '2px solid white' },
            right: { right: -4, width: 8, height: '100%', cursor: 'col-resize', zIndex: 10 },
            left: { left: -4, width: 8, height: '100%', cursor: 'col-resize', zIndex: 10 },
            bottom: { bottom: -4, height: 8, width: '100%', cursor: 'row-resize', zIndex: 10 }
        }}
      >
        <img
          src={node.attrs.src}
          alt={node.attrs.alt}
          className="w-full h-full object-cover rounded-lg"
        />
      </Resizable>
    </NodeViewWrapper>
  )
}
