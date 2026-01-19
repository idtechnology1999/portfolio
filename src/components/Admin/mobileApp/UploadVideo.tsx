import React, { useState, useRef, useEffect } from 'react';
import './UploadVideo.css';
import axios from 'axios';

interface Video {
  id: string;
  title: string;
  course: string;
  description: string;
  duration: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  thumbnailUrl: string;
  views: number;
}

export default function UploadVideo() {
  const [course, setCourse] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [filterCourse, setFilterCourse] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videosPerPage = 8;

  // API URL - Update this to your backend URL
  const API_URL = 'http://localhost:3000'; // Change to your server IP for production

  // Fetch videos from backend
  useEffect(() => {
    fetchVideos();
  }, [filterCourse]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const url = filterCourse 
        ? `${API_URL}/api/Video/get-videos?course=${filterCourse}`
        : `${API_URL}/api/Video/get-videos`;
      
      const response = await axios.get(url);

      if (response.data.success) {
        const formattedVideos: Video[] = response.data.data.map((video: any) => ({
          id: video._id,
          title: video.title,
          course: video.course,
          description: video.description,
          duration: video.duration,
          fileName: video.fileName,
          fileSize: video.fileSize,
          uploadDate: new Date(video.uploadDate).toLocaleDateString(),
          thumbnailUrl: `${API_URL}/videos/${video.videoUrl}`,
          views: video.views || 0,
        }));
        setVideos(formattedVideos);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      alert('Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      // Check file size (500MB limit)
      if (file.size > 500 * 1024 * 1024) {
        alert('File size exceeds 500MB limit');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Get video duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setVideoDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      };
      video.src = url;
    } else {
      alert('Please select a valid video file');
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      if (file.size > 500 * 1024 * 1024) {
        alert('File size exceeds 500MB limit');
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Get video duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setVideoDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      };
      video.src = url;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile || !course || !title || !description) {
      alert('Please fill all fields and select a video');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Create FormData
    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('title', title);
    formData.append('course', course);
    formData.append('description', description);
    formData.append('duration', videoDuration);

    try {
      // Upload with progress tracking
      const response = await axios.post(
        `${API_URL}/api/Video/upload-video`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data.success) {
        alert('Video uploaded successfully!');
        
        // Refresh videos list
        await fetchVideos();
        
        // Reset form
        setSelectedFile(null);
        setTitle('');
        setCourse('');
        setDescription('');
        setVideoDuration('');
        setPreviewUrl('');
        setUploadProgress(0);
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        alert(`Upload failed: ${response.data.message}`);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(
        error.response?.data?.message || 
        'Failed to upload video. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  // Delete video
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        const response = await axios.delete(
          `${API_URL}/api/Video/delete-video/${id}`
        );

        if (response.data.success) {
          alert('Video deleted successfully!');
          setVideos(videos.filter(v => v.id !== id));
        } else {
          alert(`Delete failed: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete video');
      }
    }
  };

  // Handle edit (you can implement this later)
  const handleEdit = (video: Video) => {
    // Set form fields with video data
    setTitle(video.title);
    setCourse(video.course);
    setDescription(video.description);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert('Edit mode activated. Modify the fields and upload again.');
  };

  // Pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videos.length / videosPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <div className="upload-video-container">
      <div className="upload-header">
        <h1>Upload Video</h1>
        <p>Share your knowledge by uploading educational videos</p>
      </div>

      {/* Upload Form */}
      <div className="upload-section">
        <div className="upload-grid">
          {/* Left Side - File Upload */}
          <div className="upload-left">
            <div
              className="file-upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="preview-container">
                  <video
                    ref={videoRef}
                    src={previewUrl}
                    controls
                    className="video-preview"
                  />
                  <div className="preview-info">
                    <p className="file-name">{selectedFile?.name}</p>
                    <p className="file-details">
                      {(selectedFile!.size / (1024 * 1024)).toFixed(1)} MB • {videoDuration}
                    </p>
                  </div>
                  <button
                    className="change-video-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Change Video
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <h3>Drag and drop video here</h3>
                  <p>or click to browse</p>
                  <p className="supported-formats">MP4, AVI, MOV (Max 500MB)</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Right Side - Form Fields */}
          <div className="upload-right">
            <div className="form-group">
              <label>Video Title *</label>
              <input
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Course *</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="form-select"
              >
                <option value="">Select a course</option>
                <option value="Website Design">Website Design</option>
                <option value="Backend Design">Backend Design</option>
                <option value="Mobile App">Mobile App</option>
                <option value="IT Fundamental">IT Fundamental</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Data Analysis">Data Analysis</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                placeholder="Enter video description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                rows={5}
              />
            </div>

            {videoDuration && (
              <div className="duration-display">
                <svg className="clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                </svg>
                <span>Duration: {videoDuration}</span>
              </div>
            )}

            <button
              className="upload-btn"
              onClick={handleUpload}
              disabled={uploading || !selectedFile || !course || !title || !description}
            >
              {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Video'}
            </button>

            {uploading && (
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="progress-text">{uploadProgress}%</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="videos-section">
        <div className="videos-header">
          <h2>Uploaded Videos ({videos.length})</h2>
          <div className="filter-controls">
            <select 
              className="filter-select"
              value={filterCourse}
              onChange={(e) => {
                setFilterCourse(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Courses</option>
              <option value="Website Design">Website Design</option>
              <option value="Backend Design">Backend Design</option>
              <option value="Mobile App">Mobile App</option>
              <option value="IT Fundamental">IT Fundamental</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data Analysis">Data Analysis</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p>Loading videos...</p>
          </div>
        ) : currentVideos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p>No videos found. Upload your first video!</p>
          </div>
        ) : (
          <div className="videos-grid">
            {currentVideos.map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  <video 
                    src={video.thumbnailUrl} 
                    className="thumbnail-video"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    muted
                  />
                  <div className="video-duration-badge">{video.duration}</div>
                  <div className="video-overlay">
                    <button className="play-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-course">
                    <span className="course-badge">{video.course}</span>
                  </p>
                  <p className="video-description">{video.description}</p>
                  <div className="video-meta">
                    <span className="meta-item">
                      <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                        <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
                        <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
                        <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
                      </svg>
                      {video.uploadDate}
                    </span>
                    <span className="meta-item">
                      <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {video.views} views
                    </span>
                    <span className="meta-item">
                      <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {video.fileSize}
                    </span>
                  </div>
                  <div className="video-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(video)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      onClick={() => handleDelete(video.id)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}