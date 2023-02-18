const fs = require('fs');
const youtube = require('./auth');

// Set the YouTube channel ID and video metadata
const channelId = 'your_channel_id';
const videoMetadata = {
  snippet: {
    title: 'My Uploaded Video',
    description: 'This is a test video uploaded using the YouTube API.',
    tags: ['youtube', 'api', 'video'],
    categoryId: '22', // Category ID for "People & Blogs"
  },
  status: {
    privacyStatus: 'public', // Set the privacy status to "public"
  },
};

// Set the path to the video file
const videoPath = '/path/to/your/video/file.mp4';

// Upload the video to YouTube
youtube.videos.insert(
  {
    part: 'snippet,status',
    requestBody: videoMetadata,
    media: {
      body: fs.createReadStream(videoPath),
    },
  },
  (err, res) => {
    if (err) {
      console.error('Error uploading video:', err);
    } else {
      console.log('Video uploaded successfully:', res.data.id);
    }
  }
);
