import { useState } from 'react'
import { X } from 'lucide-react'
import { getYoutubeEmbedUrl } from '../../utils/parseYoutube'

interface YoutubeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (url: string) => void
}

export default function YoutubeModal({ isOpen, onClose, onSubmit }: YoutubeModalProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const embedUrl = getYoutubeEmbedUrl(url)
    if (embedUrl) {
      onSubmit(embedUrl)
      setUrl('')
      setError('')
      onClose()
    } else {
      setError('Invalid YouTube URL. Please enter a valid YouTube video link.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Insert YouTube Video</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setError('')
              }}
              placeholder="https://www.youtube.com/watch?v=..."
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
            <p className="text-gray-400 text-xs mt-1.5">
              Paste any YouTube link (standard, short, or embed).
            </p>
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
              Insert Video
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
