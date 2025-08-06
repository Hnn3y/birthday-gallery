// Mock data for testing the gallery
export const mockMediaItems = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop',
    caption: 'What an amazing birthday celebration! The cake was absolutely delicious and the company was even better. Thank you for making this day so special! 🎂✨',
    uploaderName: 'Sarah Johnson',
    uploadDate: '2024-01-15T10:30:00Z',
    likes: 24,
    comments: 8,
    approved: true
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop',
    caption: 'Birthday surprise party was a huge success! Everyone had such a great time dancing and celebrating. The decorations turned out perfect! 🎉',
    uploaderName: 'Mike Chen',
    uploadDate: '2024-01-14T15:45:00Z',
    likes: 31,
    comments: 12,
    approved: true
  },
  {
    id: '3',
    type: 'video',
    url: '/placeholder-video.mp4',
    caption: 'The moment when the birthday candles were blown out - pure joy! This video captures the happiness perfectly.',
    uploaderName: 'Emma Wilson',
    uploadDate: '2024-01-13T18:20:00Z',
    likes: 18,
    comments: 5,
    approved: true
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    caption: 'Group photo with all the birthday guests! Such wonderful memories with amazing friends and family. Love you all! ❤️',
    uploaderName: 'David Rodriguez',
    uploadDate: '2024-01-12T20:10:00Z',
    likes: 45,
    comments: 15,
    approved: true
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=400&h=400&fit=crop',
    caption: 'The birthday cake was a masterpiece! Three layers of chocolate goodness with the most beautiful decorations.',
    uploaderName: 'Lisa Park',
    uploadDate: '2024-01-11T14:30:00Z',
    likes: 28,
    comments: 7,
    approved: true
  },
  {
    id: '6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
    caption: 'Birthday balloons everywhere! The room looked absolutely magical with all the colorful decorations and sparkles.',
    uploaderName: 'Tom Anderson',
    uploadDate: '2024-01-10T16:45:00Z',
    likes: 22,
    comments: 4,
    approved: true
  }
]

// Mock pending uploads for admin dashboard
export const mockPendingUploads = [
  {
    id: 'pending-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1607344645866-009c7d0f2e8d?w=400&h=400&fit=crop',
    caption: 'Late night birthday celebration with close friends. The intimate gathering was perfect!',
    uploaderName: 'Alex Thompson',
    uploadDate: '2024-01-16T22:15:00Z',
    approved: false
  },
  {
    id: 'pending-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    caption: 'Birthday breakfast in bed - what a wonderful way to start the special day!',
    uploaderName: 'Jessica Lee',
    uploadDate: '2024-01-16T08:30:00Z',
    approved: false
  },
  {
    id: 'pending-3',
    type: 'video',
    url: '/placeholder-video-2.mp4',
    caption: 'Birthday song performance by the kids - absolutely adorable and heartwarming!',
    uploaderName: 'Robert Kim',
    uploadDate: '2024-01-15T19:45:00Z',
    approved: false
  }
]

