import jwt from "jsonwebtoken"

export const autherizeUSer = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, "MYSECRETKETFORYOUTUBECLONE", (err, user) => {
        if(err){
            res.status(400).json({message: "Inavlid Token"})
        }

        req.user = user;
        next()
    })
    
}