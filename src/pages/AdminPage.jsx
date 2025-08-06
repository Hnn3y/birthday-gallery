import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Check, 
  X, 
  Eye, 
  Calendar, 
  User, 
  Image, 
  Video, 
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockPendingUploads, mockMediaItems } from '../utils/mockData'

const AdminPage = () => {
  const [pendingUploads, setPendingUploads] = useState([])
  const [approvedCount, setApprovedCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setPendingUploads(mockPendingUploads)
      setApprovedCount(mockMediaItems.filter(item => item.approved).length)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const handleApprove = (id) => {
    setPendingUploads(prev => prev.filter(item => item.id !== id))
    setApprovedCount(prev => prev + 1)
  }

  const handleReject = (id) => {
    setPendingUploads(prev => prev.filter(item => item.id !== id))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300">Birthday Moments Gallery</p>
              </div>
            </div>
            
            <Link to="/gallery">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gallery
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Pending Review</p>
                    <p className="text-3xl font-bold text-white">{pendingUploads.length}</p>
                  </div>
                  <div className="bg-yellow-500/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Approved</p>
                    <p className="text-3xl font-bold text-white">{approvedCount}</p>
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Uploads</p>
                    <p className="text-3xl font-bold text-white">{approvedCount + pendingUploads.length}</p>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Image className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pending Uploads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Pending Uploads
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingUploads.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">All caught up!</h3>
                  <p className="text-gray-300">No pending uploads to review at the moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUploads.map((upload, index) => (
                    <motion.div
                      key={upload.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Media Preview */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
                            {upload.type === 'image' ? (
                              <img
                                src={upload.url}
                                alt="Upload preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Video className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                              {upload.type}
                            </Badge>
                            <div className="flex items-center text-gray-300 text-sm">
                              <User className="w-4 h-4 mr-1" />
                              {upload.uploaderName}
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(upload.uploadDate)}
                            </div>
                          </div>
                          
                          {upload.caption && (
                            <p className="text-gray-200 text-sm line-clamp-2">
                              {upload.caption}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-white border-white/20 hover:bg-white/10"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(upload.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleReject(upload.id)}
                            variant="destructive"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminPage

