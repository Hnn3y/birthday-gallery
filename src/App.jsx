import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Mock data for development
const mockUploads = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    caption: 'Happy birthday! Hope your day is amazing! 🎉',
    uploader: 'Sarah M.',
    likes: 12,
    type: 'image',
    uploadDate: '2024-08-10T10:30:00Z'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400',
    caption: 'Celebrating you today! 🎂',
    uploader: 'Mike T.',
    likes: 8,
    type: 'image',
    uploadDate: '2024-08-10T11:15:00Z'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
    caption: 'Best birthday vibes! 🌟',
    uploader: 'Emma L.',
    likes: 15,
    type: 'image',
    uploadDate: '2024-08-10T12:00:00Z'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    caption: 'Another year of awesome! 🎈',
    uploader: 'John D.',
    likes: 6,
    type: 'image',
    uploadDate: '2024-08-10T13:20:00Z'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400',
    caption: 'Party time! 🥳',
    uploader: 'Lisa K.',
    likes: 9,
    type: 'image',
    uploadDate: '2024-08-10T14:45:00Z'
  }
];

// Upload Component
const UploadZone = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const file = acceptedFiles[0];
    const newUpload = {
      id: Date.now(),
      url: URL.createObjectURL(file),
      caption: '',
      uploader: '',
      likes: 0,
      type: file.type.startsWith('video') ? 'video' : 'image',
      uploadDate: new Date().toISOString()
    };
    
    onUpload(newUpload);
    setUploading(false);
    setUploadSuccess(true);
    
    // Redirect to gallery after success
    setTimeout(() => {
      navigate('/gallery');
    }, 1500);
  }, [onUpload, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  if (uploadSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Upload Successful!</h2>
        <p className="text-gray-600">Redirecting to gallery...</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-purple-500 bg-purple-50 scale-105' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-4xl"
            >
              📤
            </motion.div>
            <p className="text-lg font-medium text-gray-600">Uploading your moment...</p>
            <div className="w-64 mx-auto bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ 
                scale: isDragActive ? 1.2 : 1,
                rotate: isDragActive ? 5 : 0 
              }}
              className="text-6xl"
            >
              📸
            </motion.div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Share Your Birthday Moment
              </h2>
              <p className="text-gray-600 mb-4">
                Upload a photo or video to unlock the gallery and see everyone's moments!
              </p>
            </div>

            <div className="space-y-2 text-sm text-gray-500">
              <p>📷 Photos: JPG, PNG, GIF (max 10MB)</p>
              <p>🎥 Videos: MP4, MOV, AVI (max 10MB)</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              {isDragActive ? 'Drop it here!' : 'Choose File or Drag & Drop'}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Gallery Component with Masonry Layout
const Gallery = ({ uploads }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredUploads = uploads
    .filter(upload => 
      upload.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.uploader.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'oldest': return new Date(a.uploadDate) - new Date(b.uploadDate);
        case 'most-liked': return b.likes - a.likes;
        default: return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Birthday Moments Gallery
        </h1>
        <p className="text-gray-600 text-lg">
          {uploads.length} beautiful moments captured ✨
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search moments or people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most-liked">Most Liked</option>
        </select>
      </motion.div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <AnimatePresence>
          {filteredUploads.map((upload, index) => (
            <motion.div
              key={upload.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid mb-4"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                <div
                  className="relative overflow-hidden"
                  onClick={() => setSelectedImage(upload)}
                >
                  {upload.type === 'video' ? (
                    <video
                      src={upload.url}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      muted
                    />
                  ) : (
                    <img
                      src={upload.url}
                      alt={upload.caption}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="text-white text-2xl"
                    >
                      🔍
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                    {upload.caption}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium">{upload.uploader}</span>
                    <div className="flex items-center space-x-2">
                      <span>❤️ {upload.likes}</span>
                      <span>{new Date(upload.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.type === 'video' ? (
                <video
                  src={selectedImage.url}
                  controls
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
              <div className="text-white text-center mt-4">
                <p className="text-lg mb-2">{selectedImage.caption}</p>
                <p className="text-sm opacity-75">by {selectedImage.uploader}</p>
              </div>
            </motion.div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:opacity-75"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredUploads.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No moments found</h3>
          <p className="text-gray-500">Try adjusting your search or upload the first moment!</p>
        </motion.div>
      )}
    </div>
  );
};

// Home Landing Page
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto px-6"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="text-8xl mb-6"
        >
          🎂
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
        >
          Birthday Moments
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-600 mb-8 leading-relaxed"
        >
          Share your special moments from the celebration! Upload a photo or video to unlock the gallery and see everyone's memories.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/upload')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            📤 Share a Moment
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/gallery')}
            className="bg-white text-gray-700 px-8 py-4 rounded-full font-medium text-lg border-2 border-gray-200 hover:border-purple-300 transition-all duration-300"
          >
            🖼️ View Gallery
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>August 11th, 2024 • Birthday Celebration</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Navigation Component
const Navigation = ({ uploadsCount }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            🎂 Birthday Moments
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/upload"
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >
              Upload
            </Link>
            <Link
              to="/gallery"
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium flex items-center space-x-1"
            >
              <span>Gallery</span>
              {uploadsCount > 0 && (
                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                  {uploadsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Main App Component
const App = () => {
  const [uploads, setUploads] = useState(mockUploads);

  const handleUpload = (newUpload) => {
    setUploads(prev => [newUpload, ...prev]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/upload"
            element={
              <>
                <Navigation uploadsCount={uploads.length} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <UploadZone onUpload={handleUpload} />
                </div>
              </>
            }
          />
          <Route
            path="/gallery"
            element={
              <>
                <Navigation uploadsCount={uploads.length} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <Gallery uploads={uploads} />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;