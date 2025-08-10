import Video from "../Schema/videos.schema.js";
import { convertToEmbedUrl, getYoutubeThumbnail } from "../Utils/helperFunction.js";

export const addVideo = async (req, res) => {
  try {
    const { title, description, videoURL } = req.body;
    const embedVideoUL = convertToEmbedUrl(videoURL);
    const thumbnail = getYoutubeThumbnail(embedVideoUL)

    const newVideo = new Video({
      title: title,
      description: description,
      videoURL: embedVideoUL,
      thumbnail: thumbnail,
    });

    await newVideo.save();
    res.status(200).json({ message: "Video SuccessFully Added", newVideo });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const allVideos = await Video.find({});
    res.status(200).json({ message: "All Videos", allVideos });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
