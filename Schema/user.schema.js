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
        default: "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
    },
})

export const User = mongoose.model("User", userSchema)