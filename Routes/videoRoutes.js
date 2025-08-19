import express from "express"
import { addVideo, getAllVideos } from "../Controllers/video.controller.js"
import { autherizeUSer } from "../Middlewares/authUser.js"
const videoRouter = express.Router()

videoRouter.post("/uploads", autherizeUSer, addVideo)
videoRouter.get("/allVideos", getAllVideos)

export default videoRouter