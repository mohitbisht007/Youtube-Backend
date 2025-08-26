import express from "express";
import { createChannel, getSingleChannel, subscribeChannel } from "../Controllers/channel.controller.js";
import { autherizeUSer } from "../Middlewares/authUser.js";

const channelRouter = express.Router()

channelRouter.post( "/createChannel", autherizeUSer, createChannel)
channelRouter.get("/channel/:channelhandle", getSingleChannel )
channelRouter.put( "/subscribing", autherizeUSer, subscribeChannel)

export default channelRouter