import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },

  channelHandle: {
    type: String,
    required: true,
    unique: true,
  },

  channelDescription: {
    type: String,
  },

  channelOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  channelAvatar: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
  },

  links: {
    website: { type: String },
    twitter: { type: String },
    github: { type: String },
    instagram: { type: String },
  },

  subscribers: {
    type: Number,
    default: 0,
  },

  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    },
  ],
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
