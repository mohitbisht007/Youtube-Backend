import { User } from "../Schema/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


//Registering User Logic
export const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    }); //finding existing user to show if username or email is already exist or not

    if (existingUser) {
      if (existingUser.username === username) {
       return res.status(409).json({ message: "Username Already Exist" });
      }

      if (existingUser.email === email) {
       return res.status(409).json({ message: "Email Already Exist" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10); //hashing password before storing it to DB

    const newUSer = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUSer.save(); // saving newUser ro DB

    return res.status(201).json({
      message: "Succesfully Registers",
      user: {
        id: newUSer._id,
        username: newUSer.username,
        email: newUSer.email,
        subscriptions: []
      }, // sending data to frontend for new User
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Logic for login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
     if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }); //finding user from DB with email

    if (!user) {
     return res.status(404).json({ message: "No User Found" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password) //matching password before login

    if (!passwordMatched) {
    return  res.status(401).json({ message: "Wrong Password" });
    }

    const token =jwt.sign(
        {id: user._id, username: user.username, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    ) // used jwt to generate token

    res.status(200).json({ message: "Login Successful", user: {
        id: user._id,
        username: user.username, 
        email: user.email,
        avatar: user.avatar,
        subscriptions: user.subscriptions || []
    }, token }); // sending user related data to frontend after login
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Logic to find Individual User
export const findUser = async(req,res)=> {
  try {
    const userData = await User.findById(req.user.id).populate("channel", "channelName channelHandle") //after finding user populating channelData to show on Header
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({user: userData})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


//Logic to find checkUsername Already exist or not for editing username
export const checkUsername = async (req, res) => {
  const { username } = req.body;
  const exists = await User.findOne({ username });
  res.json({ available: !exists });
};

// Edit User Logic
export const editUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Username update
    if (username && username !== user.username) {
      const exists = await User.findOne({ username });
      if (exists) return res.status(409).json({ message: "Username not available" });
      user.username = username;
    }

    // updating Password by checking if current password correct
    if (newPassword && currentPassword) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) return res.status(401).json({ message: "Current password incorrect" });
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update profile" });
  }
};
