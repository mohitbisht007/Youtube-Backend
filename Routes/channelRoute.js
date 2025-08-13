import express from "express";
import { createChannel } from "../Controllers/channel.controller.js";
import { autherizeUSer } from "../Middlewares/authUser.js";

const channelRouter = express.Router()

channelRouter.post( "/createChannel", autherizeUSer, createChannel)

export default channelRouter