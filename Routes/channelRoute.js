import express from "express";
import { createChannel, getSingleChannel, subscribeChannel, unSubscribeChannel } from "../Controllers/channel.controller.js";
import { autherizeUSer } from "../Middlewares/authUser.js";

const channelRouter = express.Router()

channelRouter.post( "/createChannel", autherizeUSer, createChannel)
channelRouter.get("/channel/:channelhandle", getSingleChannel )
channelRouter.put( "/channel/subscribe", autherizeUSer, subscribeChannel)
channelRouter.put( "/channel/unsubscribe", autherizeUSer, unSubscribeChannel)

export default channelRouter