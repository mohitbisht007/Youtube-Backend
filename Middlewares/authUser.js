import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
export const autherizeUSer = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(400).json({message: "Token Not Provided"})
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(401).json({message: "Inavlid or Expired Token"})
        }

        req.user = user;
        next()
    })
    
}