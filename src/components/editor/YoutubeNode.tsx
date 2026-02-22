import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Resizable } from 're-resizable'
import { useState, useEffect } from 'react'

export default function YoutubeNode(props: NodeViewProps) {
  const { node, updateAttributes, selected, extension } = props
  
  // We need to handle the alignment style if it's applied by TextAlign
  // TextAlign adds 'textAlign' to style or class. 
  // But for a node view, we might need to ensure the wrapper takes full width to allow alignment of inner content if it's not 100% width.
  // Actually, TextAlign on a block node sets `text-align` on the node's DOM element.
  // NodeViewWrapper renders that element.
  
  return (
    <NodeViewWrapper className={`my-4 relative flex ${selected ? 'z-10' : ''}`} style={{ justifyContent: node.attrs.textAlign === 'center' ? 'center' : node.attrs.textAlign === 'right' ? 'flex-end' : 'flex-start' }}>
      <Resizable
        size={{ 
            width: node.attrs.width, 
            height: node.attrs.height 
        }}
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
          left: true, // Allow resizing from left too
          topRight: false,
          bottomRight: true,
          bottomLeft: true,
          topLeft: false,
        }}
        lockAspectRatio={true}
        className={`relative transition-all group ${selected ? 'ring-2 ring-blue-500 rounded-lg' : 'hover:ring-2 hover:ring-blue-300 rounded-lg'}`}
        handleStyles={{
            bottomRight: { bottom: -6, right: -6, width: 12, height: 12, background: '#3b82f6', borderRadius: '50%', zIndex: 20, border: '2px solid white' },
            bottomLeft: { bottom: -6, left: -6, width: 12, height: 12, background: '#3b82f6', borderRadius: '50%', zIndex: 20, border: '2px solid white' },
            right: { right: -4, width: 8, height: '100%', cursor: 'col-resize', zIndex: 10 },
            left: { left: -4, width: 8, height: '100%', cursor: 'col-resize', zIndex: 10 },
            bottom: { bottom: -4, height: 8, width: '100%', cursor: 'row-resize', zIndex: 10 }
        }}
        defaultSize={{
            width: '100%',
            height: 'auto',
        }}
      >
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden aspect-video">
          <iframe
            src={node.attrs.src}
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
            frameBorder="0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          {/* Overlay to allow selection without interacting with iframe */}
          <div className="absolute inset-0 bg-transparent" />
        </div>
      </Resizable>
    </NodeViewWrapper>
  )
}
