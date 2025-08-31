import express from "express";
import { createChannel, editChannel, getSingleChannel, subscribeChannel, unSubscribeChannel } from "../Controllers/channel.controller.js";
import { autherizeUSer } from "../Middlewares/authUser.js";
import upload from "../Middlewares/upload.js";

const channelRouter = express.Router()

channelRouter.post( "/createChannel", upload.single("channelAvatar"), autherizeUSer, createChannel)
channelRouter.get("/channel/:channelhandle", getSingleChannel )
channelRouter.put( "/channel/subscribe", autherizeUSer, subscribeChannel)
channelRouter.put( "/channel/unsubscribe", autherizeUSer, unSubscribeChannel)
channelRouter.put("/channel/:channelhandle/edit", autherizeUSer, upload.single("channelAvatar"), editChannel)

export default channelRouter