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

    thumbnail: {
        type: String,
        default: null
    },

    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
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

    category: {
        type: String,
        required: true
    },

    comments: [
        {
            user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            text: {type: String, required: true}
        }
    ]
 }, { timestamps: true })

const Video = mongoose.model("Video", videoSchema) 
export default Video