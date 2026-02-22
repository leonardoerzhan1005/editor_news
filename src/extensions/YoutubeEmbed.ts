import { Node } from "@tiptap/core"
import { ReactNodeViewRenderer } from "@tiptap/react"
import YoutubeNode from "../components/editor/YoutubeNode"

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      setYoutubeVideo: (options: { src: string }) => ReturnType
    }
  }
}

export default Node.create({
  name: "youtube",

  group: "block",

  addAttributes() {
    return {
      src: { default: null },
      width: { default: '100%' },
      height: { default: 'auto' },
    }
  },

  parseHTML() {
    return [{ tag: "iframe[src]" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", { ...HTMLAttributes, frameborder: 0, allowfullscreen: true }]
  },

  addNodeView() {
    return ReactNodeViewRenderer(YoutubeNode)
  },

  addCommands() {
    return {
      setYoutubeVideo:
        (options: { src: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})
