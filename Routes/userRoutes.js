import { loginUser, signUpUser } from "../Controllers/user.controller.js";
import express from "express"

const userRouter = express.Router()

userRouter.post("/signup", signUpUser)
userRouter.post("/login", loginUser)

export default userRouter