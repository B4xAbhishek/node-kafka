const { google } = require('googleapis');

// Set the path to your client secret JSON file
const CLIENT_SECRET_PATH = '/path/to/your/client_secret.json';

// Set the YouTube API version and authentication credentials
const API_VERSION = 'v3';
const AUTH_SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
const auth = new google.auth.GoogleAuth({
  keyFile: CLIENT_SECRET_PATH,
  scopes: AUTH_SCOPES,
});

// Get the authenticated YouTube API client
const youtube = google.youtube({
  version: API_VERSION,
  auth: auth,
});

module.exports = youtube;
