import { User } from "../Schema/user.schema.js";

export const signUpUser = async (req, res) => {
   try {
    const {username, email, password} = req.body;
    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existingUser){
        if(existingUser.username === username){
            res.status(400).json({message: "Username Already Exist"})
        } 

        if(existingUser.email === email){
            res.status(400).json({message: "Email Already Exist"})
        } 
    }

    const newUSer = new User({
        username: username,
        email: email,
        password: password,
    })

    await newUSer.save()

    res.status(200).json({message: "Succesfully Registers", user: {
        id: newUSer._id,
        username: newUSer.username,
        email: newUSer.email,
        password: newUSer.password,
    }})
   } catch (error) {
      res.status(400).json({error})
   }
}


export const loginUser = async(req, res) => {
  try {
     const {email, password} = req.body 
    const user = await User.findOne({email})

    if(!user){
        res.status(400).json({message: "No User Found"})
    }

    if(password !== user.password){
         res.status(400).json({message: "Wrong Password"})
    }

    res.status(200).json({message: "Login Successful", user: user})
  } catch (error) {
    res.status(400).json({error})
  }
}