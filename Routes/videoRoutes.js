import express from "express"
import { addVideo, getAllVideos, likeVideo, likeRemoved, comment } from "../Controllers/video.controller.js"
import { autherizeUSer } from "../Middlewares/authUser.js"
const videoRouter = express.Router()

videoRouter.post("/uploads", autherizeUSer, addVideo)
videoRouter.get("/allVideos", getAllVideos)
videoRouter.put("/like/:videoId", autherizeUSer, likeVideo)
videoRouter.put("/dislike/:videoId",autherizeUSer, likeRemoved)
videoRouter.put("/comment/:videoId", autherizeUSer, comment)

export default videoRouter