import Image from "@tiptap/extension-image"
import { ReactNodeViewRenderer } from "@tiptap/react"
import ImageNode from "../components/editor/ImageNode"

export default Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: "300px" },
      height: { default: "auto" },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode)
  },
})
