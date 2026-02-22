import { useState, useRef } from 'react'
import { X, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (src: string) => void
}

export default function ImageModal({ isOpen, onClose, onSubmit }: ImageModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      onSubmit(url)
      setUrl('')
      setError('')
      onClose()
    } else {
      setError('Please enter a valid image URL.')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size too large. Max 5MB.')
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onSubmit(event.target.result as string)
          onClose()
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Insert Image</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'upload' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setActiveTab('upload'); setError(''); }}
          >
            <Upload size={16} /> Upload
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === 'url' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setActiveTab('url'); setError(''); }}
          >
            <LinkIcon size={16} /> URL
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'upload' ? (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="bg-blue-100 p-3 rounded-full mb-3 text-blue-600">
                <ImageIcon size={24} />
              </div>
              <p className="text-sm font-medium text-gray-700">Click to upload image</p>
              <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
              />
              {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
            </div>
          ) : (
            <form onSubmit={handleUrlSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value)
                    setError('')
                  }}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                >
                  Insert Image
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
