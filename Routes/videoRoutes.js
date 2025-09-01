import express from "express"
import { addVideo, getAllVideos, likeVideo, likeRemoved, comment, getSingleVideo, editVideo, deleteVideo } from "../Controllers/video.controller.js"
import { autherizeUSer } from "../Middlewares/authUser.js"
const videoRouter = express.Router()

videoRouter.post("/uploads", autherizeUSer, addVideo)
videoRouter.get("/allVideos", getAllVideos)
videoRouter.put("/like/:videoId", autherizeUSer, likeVideo)
videoRouter.put("/dislike/:videoId",autherizeUSer, likeRemoved)
videoRouter.put("/comment/:videoId", autherizeUSer, comment)
videoRouter.get("/video/:videoId", getSingleVideo);
videoRouter.put("/video/:videoId/edit", autherizeUSer, editVideo);
videoRouter.delete("/video/:videoId", autherizeUSer, deleteVideo);

export default videoRouter