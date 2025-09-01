import { loginUser, signUpUser, findUser, checkUsername, editUser } from "../Controllers/user.controller.js";
import { autherizeUSer } from "../Middlewares/authUser.js";
import express from "express"

const userRouter = express.Router()

userRouter.post("/signup", signUpUser)
userRouter.post("/login", loginUser)
userRouter.get("/getUser", autherizeUSer, findUser)
userRouter.post("/check-username", checkUsername);
userRouter.put("/edit-user", autherizeUSer, editUser);

export default userRouter