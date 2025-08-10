import express from "express"
import { addVideo, getAllVideos } from "../Controllers/video.controller.js"
const videoRouter = express.Router()

videoRouter.post("/uploads", addVideo)
videoRouter.get("/allVideos", getAllVideos)

export default videoRouter