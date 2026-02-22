import Editor from "../components/editor/Editor"

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Rich Content Editor</h1>
          <p className="text-gray-600 mt-2">A powerful visual editor for your content creation needs.</p>
        </header>
        
        <main className="flex-1">
          <Editor />
        </main>
      </div>
    </div>
  )
}
