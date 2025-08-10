import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    videoURL: {
        type: String,
        required: true
    },

    views: {
        type: Number,
        default: 0,
    },

    likes: {
        type: Number,
        default: 0
    },

    comments: {
        type: Number,
        default: 0
    },
})

const Video = mongoose.model("Video", videoSchema) 
export default Video