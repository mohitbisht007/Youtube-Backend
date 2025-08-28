import Video from "../Schema/videos.schema.js";
import Channel from "../Schema/channel.schema.js";
import {
  convertToEmbedUrl,
  getYoutubeThumbnail,
} from "../Utils/helperFunction.js";
import { User } from "../Schema/user.schema.js";

export const addVideo = async (req, res) => {
  try {
    const { title, description, videoURL, category } = req.body;
    const ownerId = req.user.id;
    const embedVideoUL = convertToEmbedUrl(videoURL);
    const thumbnail = getYoutubeThumbnail(embedVideoUL);

    const channel = await Channel.findOne({ channelOwner: ownerId });
    console.log(channel);

    const newVideo = new Video({
      title: title,
      description: description,
      videoURL: embedVideoUL,
      thumbnail: thumbnail,
      channel: channel._id,
      category: category,
    });

    channel.videos.push(newVideo._id);

    await channel.save();
    await newVideo.save();
    res.status(200).json({ message: "Video SuccessFully Added", newVideo });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const allVideos = await Video.find({}).populate("channel");
    res.status(200).json({ message: "All Videos", allVideos });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id;

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { likedVideos: videoId } },
      { new: true }
    );

    await Video.findByIdAndUpdate(
      videoId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json({ messgae: "video Liked" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

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
    res.status(400).json(error.message);
  }
};

export const comment =  async (req, res) => {
  try {
    const {comment} = req.body;
    const { videoId } = req.params;
    const userId = req.user.id

    await Video.findByIdAndUpdate(
      videoId,
      { $push: { comments : {user: userId, text: comment} } },
      { new: true }
    );

    res.status(200).json({ messgae: "Comment Succesfull", comment });
  } catch (error) {
     res.status(400).json(error.message);
  }
}
