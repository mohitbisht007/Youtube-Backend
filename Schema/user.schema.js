import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        unique : true,
        trim: true,
        lowercase: true,
        minLength: [3, "Username Should be atleast 3 Character Long"]
    },

    email: {
        type: String,
        required: [true, "Email is Required"],
        unique : true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password Should be atleast 6 Character Long"]
    },

    avatar: {
        type: String,
        default: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
    },

    channel : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
    },

    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
    }],

    likedVideos : [
       { type: mongoose.Schema.Types.ObjectId,
        ref: "Video"}
    ]
})

export const User = mongoose.model("User", userSchema)