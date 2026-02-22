import { Extension } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { DOMParser as ProseMirrorDOMParser } from "@tiptap/pm/model"
import sanitizeHtml from "sanitize-html"

export default Extension.create({
  name: "pasteFromWord",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('pasteFromWord'),
        props: {
          handlePaste: (view, event, slice) => {
            const html = event.clipboardData?.getData("text/html")
            if (!html) return false

            // Basic sanitization to remove some Word-specific garbage if needed
            // But Tiptap's schema handles most of it.
            // The user requested explicit sanitization.
            const clean = sanitizeHtml(html, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(["table", "tr", "td", "th", "thead", "tbody", "tfoot", "img", "iframe", "span", "div", "p", "br", "b", "i", "u", "strong", "em", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li"]),
              allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                '*': ['style', 'class', 'align'],
                'img': ['src', 'width', 'height', 'alt'],
                'iframe': ['src', 'width', 'height', 'allowfullscreen', 'frameborder'],
                'td': ['colspan', 'rowspan', 'width'],
                'th': ['colspan', 'rowspan', 'width'],
                'table': ['border', 'cellpadding', 'cellspacing', 'width'],
              }
            })

            if (html !== clean) {
                const parser = new DOMParser()
                const doc = parser.parseFromString(clean, 'text/html')
                
                // We need to parse the cleaned HTML into a ProseMirror slice
                // using the editor's schema parser.
                // However, view.props.clipboardParser is usually available.
                
                // If we return true, we handled the paste.
                // We can construct a slice and insert it.
                
                // For simplicity in this environment, let's rely on Tiptap's default behavior 
                // but we can try to modify the event data if possible, or just insert manually.
                
                // Since modifying clipboard data on paste event is read-only usually,
                // we have to manually parse and insert.
                
                // Let's try to use the schema's parser.
                const schema = view.state.schema;
                const fragment = ProseMirrorDOMParser.fromSchema(schema).parse(doc.body);
                const transaction = view.state.tr.replaceSelectionWith(fragment);
                view.dispatch(transaction);
                return true;
            }

            return false
          },
        },
      }),
    ]
  },
})
