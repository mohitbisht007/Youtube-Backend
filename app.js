import express from "express"
import mongoose from "mongoose"
import userRouter from "./Routes/userRoutes.js"

const app = express()
const PORT = 5050

app.use(express.json())

mongoose.connect("mongodb+srv://mohitbisht5678:Mohit123Mohit123@cluster0.odbmoae.mongodb.net/")
.then(() => {
    console.log("DB Connected")
})
.catch((e) => {
  console.log(e)
})
app.get("/", (req, res) => {
    res.send("We are on Home Route")
})

app.use("/api/auth", userRouter)

app.listen(PORT, ()=> {
  console.log("App Is Running")
})