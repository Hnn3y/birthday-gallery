import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Filter, Search, SortDesc } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import GalleryGrid from '../components/common/GalleryGrid'
import { mockMediaItems } from '../utils/mockData'

const GalleryPage = () => {
  const [mediaItems, setMediaItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    // Simulate loading approved media items
    const loadMediaItems = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const approvedItems = mockMediaItems.filter(item => item.approved)
      setMediaItems(approvedItems)
      setFilteredItems(approvedItems)
      setIsLoading(false)
    }

    loadMediaItems()
  }, [])

  useEffect(() => {
    let filtered = mediaItems.filter(item =>
      item.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uploaderName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Sort items
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate))
        break
      case 'most-liked':
        filtered.sort((a, b) => b.likes - a.likes)
        break
      default:
        break
    }

    setFilteredItems(filtered)
  }, [mediaItems, searchTerm, sortBy])

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
        >
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Birthday Gallery
            </h1>
            <p className="text-gray-600">
              Celebrating special moments together
            </p>
          </div>

          {/* Upload More Button */}
          <Link to="/">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Upload More
            </Button>
          </Link>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search memories or people..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <SortDesc className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-liked">Most Liked</option>
              </select>
            </div>
          </div>

          {/* Filter Stats */}
          {searchTerm && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredItems.length} of {mediaItems.length} memories
              {searchTerm && ` for "${searchTerm}"`}
            </div>
          )}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GalleryGrid mediaItems={filteredItems} isLoading={isLoading} />
        </motion.div>

        {/* Floating Upload Button (Mobile) */}
        <Link to="/" className="lg:hidden">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}

export default GalleryPage

