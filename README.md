# YouTube Clone Backend

This is the backend API for the YouTube Clone project, built with Node.js, Express, MongoDB, JWT authentication, and Cloudinary and Multer for image uploads.

---

## Features

- User registration and login (JWT authentication)
- Channel creation, editing, and subscription management
- Video upload through link, editing, deletion
- Commenting on videos
- Like/Unlike videos
- RESTful API endpoints
- CORS support for frontend integration

---

## Tech Stack

- **Node.js**
- **Express**
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **Cloudinary** for media uploads
- **Multer** for file handling
- **dotenv** for environment variables

---

## Folder Structure

```
YouTubeClone BackEnd/
├── Controllers/        # Route controllers
├── Middlewares/        # Auth, upload, etc.
├── Routes/             # Express routers
├── Schema/             # Mongoose models
├── Utils/              # Helper functions
├── app.js              # Express app entry
├── .env                # Environment variables
├── package.json
```

---

## Getting Started
```
### 1. **Clone the repository**
git clone https://github.com/mohitbisht007/Youtube-Backend
cd Youtube-Backend
```

### 2. **Install dependencies**
```
npm install

```

### 3. **Environment Variables**

```

If file do not have .env file then:

Create a `.env` file in the root directory with the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. **Start the server**

npm start
```
> **Note:** For deployment (e.g., Render), ensure your `package.json` uses `"start": "node app.js"`.
---

## API Endpoints

### **User**
- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login user

### **Channel**
- `POST /api/channel/create` - Create a channel
- `GET /api/channel/:channelhandle` - Get channel by handle
- `PUT /api/channel/:channelhandle` - Edit channel
- `PUT /api/channel/subscribe` - Subscribe to channel
- `PUT /api/channel/unsubscribe` - Unsubscribe from channel

### **Video**
- `POST /api/video/uploads` - Upload a video
- `GET /api/video/all` - Get all videos
- `GET /api/video/:videoId` - Get single video
- `PUT /api/video/:videoId` - Edit video
- `DELETE /api/video/:videoId` - Delete video
- `PUT /api/video/like/:videoId` - Like video
- `PUT /api/video/dislike/:videoId` - Dislike video

### **Comment**
- `POST /api/comment/:videoId` - Add comment
- `PUT /api/comment/:videoId/:commentId` - Edit comment
- `DELETE /api/comment/:videoId/:commentId` - Delete comment

---

## Deployment

- **Render:** Set all required environment variables in the Render dashboard.
- **CORS:** Make sure your frontend domain is allowed in your CORS configuration.

---

## Notes

- All protected routes require a valid JWT token in the `Authorization` header.
- File uploads use Cloudinary; ensure your Cloudinary credentials are correct.
- Check backend logs on Render for debugging deployment issues.

---

MIT

---

## Author

Mohit Singh Bisht  
[GitHub](https://github.com/mohitbisht007)