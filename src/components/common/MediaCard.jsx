import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Calendar, User, Play } from 'lucide-react'
import { Card, CardContent } from './components/ui/card'

const MediaCard = ({ media, index }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          {/* Media Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {media.type === 'image' ? (
              <>
                <img
                  src={media.url}
                  alt={media.caption || 'Birthday memory'}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-80" />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{media.uploaderName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(media.uploadDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Caption */}
            {media.caption && (
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {media.caption}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className="flex items-center space-x-1 text-gray-500 hover:text-pink-500 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      isLiked ? 'fill-pink-500 text-pink-500' : ''
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {media.likes + (isLiked ? 1 : 0)}
                  </span>
                </button>
                
                <div className="flex items-center space-x-1 text-gray-500">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{media.comments}</span>
                </div>
              </div>

              <div className="text-xs text-gray-400">
                {formatDate(media.uploadDate)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default MediaCard

