import Video from "../Schema/videos.schema.js";
import Channel from "../Schema/channel.schema.js";
import {
  convertToEmbedUrl,
  getYoutubeThumbnail,
} from "../Utils/helperFunction.js";
import { User } from "../Schema/user.schema.js";

//Adding Video Controller
export const addVideo = async (req, res) => {
  try {
    const { title, description, videoURL, category } = req.body;

    if (!title && !videoURL && !category) {
      res
        .status(400)
        .json({ message: "Title, VideoURL and Category Is Required" });
    }

    const ownerId = req.user.id;

    if (!ownerId) {
      res.status(401).json({ message: "Token Invalid Please Login Again" });
    }

    const embedVideoUL = convertToEmbedUrl(videoURL);
    const thumbnail = getYoutubeThumbnail(embedVideoUL);

    const channel = await Channel.findOne({ channelOwner: ownerId });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const newVideo = new Video({
      title: title,
      description: description,
      videoURL: embedVideoUL,
      thumbnail: thumbnail,
      channel: channel._id,
      category: category,
    });    // created new video with all required field gathered from req.body
 

    channel.videos.push(newVideo._id);

    await channel.save();
    await newVideo.save();
    res.status(201).json({ message: "Video SuccessFully Added", newVideo });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


// fetching all videos
export const getAllVideos = async (req, res) => {
  try {

    //getting all videos fron DB and populating videos as well as user data who has commented
    const allVideos = await Video.find({})
      .populate("channel")
      .populate("comments.user");
    res.status(200).json({ message: "All Videos", allVideos });
  } catch (error) {
    res.status(500).json({ message: "Failed To Fetch Videos" });
  }
};


// controller for liking a Video
export const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    // finding user based on userId and pushin likedVideoId to it
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { likedVideos: videoId } },
      { new: true }
    );


    // Finding and up[dating video with likes
    await Video.findByIdAndUpdate(
      videoId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json({ messgae: "video Liked" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


//logic for removing like
export const likeRemoved = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    await User.findByIdAndUpdate(
      userId,
      { $pull: { likedVideos: videoId } },
      { new: true }
    );

    await Video.findByIdAndUpdate(
      videoId,
      { $inc: { likes: -1 } },
      { new: true }
    );

    res.status(200).json({ messgae: "video Liked" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//comment logic
export const comment = async (req, res) => {
  try {
    const { comment } = req.body;
    const { videoId } = req.params;
    const userId = req.user.id;

      if (!comment || !comment.trim()) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    //updating video comment array with adding coment text and userId who commented
    const video = await Video.findByIdAndUpdate(
      videoId,
      { $push: { comments: { user: userId, text: comment } } },
      { new: true }
    ).populate("comments.user", "username avatar"); //

     if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const newComment = video.comments[video.comments.length - 1];

    res.status(201).json({
      message: "Comment Successful",
      comment: newComment, // return the object with user + text
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get single video
export const getSingleVideo = async (req, res) => {
  try {
    //finding video
    const video = await Video.findById(req.params.videoId)
      .populate("channel")
      .populate("comments.user");

    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch video" });
  }
};

// Edit video
export const editVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    //updating video with title and description
    const video = await Video.findByIdAndUpdate(
      req.params.videoId,
      { title, description },
      { new: true }
    )
      .populate("channel")
      .populate({
        path: "comments.user",
        select: "username avatar"
      });
    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json({ message: "Video updated", video });
  } catch (error) {
    res.status(500).json({ message: "Failed to update video" });
  }
};

// Delete video
export const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.videoId);
    res.status(200).json({ message: "Video deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete video" });
  }
};


