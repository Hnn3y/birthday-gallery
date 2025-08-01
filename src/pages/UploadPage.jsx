import React, { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import { uploadToCloudinary } from '../utils/cloudinary'
import { supabase } from '../utils/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [poster, setPoster] = useState('')
  const [media, setMedia] = useState(null)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    setMedia(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!title || !caption || !poster || !media) return alert('All fields required')

    const uploaded = await uploadToCloudinary(media)
    const { data, error } = await supabase.from('moments').insert({
      title,
      caption,
      poster_name: poster,
      media_url: uploaded.secure_url,
      approved: false,
      media_type: media.type.startsWith('video') ? 'video' : 'image',
    })

    if (error) {
      alert('Upload failed')
      return
    }

    navigate('/gallery')
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Typography variant="h4" gutterBottom>Upload a Moment</Typography>
      <TextField fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" />
      <TextField fullWidth label="Caption" value={caption} onChange={e => setCaption(e.target.value)} margin="normal" />
      <TextField fullWidth label="Your Name" value={poster} onChange={e => setPoster(e.target.value)} margin="normal" />
      <input type="file" accept="image/*,video/*" onChange={handleMediaChange} className="my-4" />
      {preview && (
        <div className="my-4">
          {media.type.startsWith('video') ? (
            <video src={preview} controls className="rounded-lg w-full" />
          ) : (
            <img src={preview} alt="Preview" className="rounded-lg w-full" />
          )}
        </div>
      )}
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}
