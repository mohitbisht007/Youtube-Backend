import jwt from "jsonwebtoken"

export const autherizeUSer = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(400).json({message: "Token Not Provided"})
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, "MYSECRETKETFORYOUTUBECLONE", (err, user) => {
        if(err){
            return res.status(400).json({message: "Inavlid Token"})
        }

        req.user = user;
        next()
    })
    
}