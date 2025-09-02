import express from "express"
import mongoose from "mongoose"
import userRouter from "./Routes/userRoutes.js"
import videoRouter from "./Routes/videoRoutes.js"
import channelRouter from "./Routes/channelRoute.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = 5050

app.use(express.json())

app.use(cors({
  origin: ["http://localhost:5173", "https://zentroo.netlify.app"],
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"]
}))

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DB Connected")
})
.catch((e) => {
  console.log(e)
})
app.get("/", (req, res) => {
    res.send("We are on Home Route")
})

app.use("/api", userRouter)
app.use("/api", videoRouter)
app.use("/api", channelRouter)

app.listen(PORT, ()=> {
  console.log("App Is Running")
})