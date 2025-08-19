import express from "express";
import { createChannel, getSingleChannel } from "../Controllers/channel.controller.js";
import { autherizeUSer } from "../Middlewares/authUser.js";

const channelRouter = express.Router()

channelRouter.post( "/createChannel", autherizeUSer, createChannel)
channelRouter.get("/channel/:channelhandle", getSingleChannel )

export default channelRouter