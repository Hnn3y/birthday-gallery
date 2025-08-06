import { motion } from 'framer-motion'
import { ImageIcon, Sparkles } from 'lucide-react'
import MediaCard from './MediaCard'

const GalleryGrid = ({ mediaItems, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (!mediaItems || mediaItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ImageIcon className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          No memories yet
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Be the first to share a birthday memory! Upload your photos and videos to get started.
        </p>
        <div className="flex items-center justify-center text-pink-500">
          <Sparkles className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Waiting for your first upload</span>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Birthday Memories
        </h2>
        <p className="text-gray-600">
          {mediaItems.length} {mediaItems.length === 1 ? 'memory' : 'memories'} shared
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mediaItems.map((media, index) => (
          <MediaCard
            key={media.id}
            media={media}
            index={index}
          />
        ))}
      </div>

      {/* Load More Placeholder */}
      {mediaItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8"
        >
          <p className="text-gray-500 text-sm">
            More memories coming soon...
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default GalleryGrid

