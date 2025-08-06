import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Users, Heart, Camera } from 'lucide-react'
import UploadForm from '../components/common/UploadForm'
import PopupModal from '../components/common/PopupModal'

const UploadPage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const navigate = useNavigate()

  const handleUploadSuccess = () => {
    setShowSuccessModal(true)
  }

  const handleViewGallery = () => {
    setShowSuccessModal(false)
    navigate('/gallery')
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Share Your Birthday Moments
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your favorite birthday photos and videos to create lasting memories with friends and family
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200"
            >
              <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Collaborative</h3>
              <p className="text-sm text-gray-600">
                Everyone can contribute their favorite moments from the celebration
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-200"
            >
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Curated</h3>
              <p className="text-sm text-gray-600">
                All uploads are reviewed to ensure only the best memories are shared
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-indigo-200"
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Memorable</h3>
              <p className="text-sm text-gray-600">
                Create a beautiful gallery that captures the joy of the celebration
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <UploadForm onUploadSuccess={handleUploadSuccess} />
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <span className="bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Choose your photo or video</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Add an optional caption</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Share and view in gallery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <PopupModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onViewGallery={handleViewGallery}
      />
    </div>
  )
}

export default UploadPage

