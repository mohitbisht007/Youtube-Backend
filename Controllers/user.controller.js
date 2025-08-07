import { User } from "../Schema/user.schema.js";
import bcrypt from "bcrypt";

export const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
       return res.status(400).json({ message: "Username Already Exist" });
      }

      if (existingUser.email === email) {
       return res.status(400).json({ message: "Email Already Exist" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUSer = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUSer.save();

    return res.status(200).json({
      message: "Succesfully Registers",
      user: {
        id: newUSer._id,
        username: newUSer.username,
        email: newUSer.email,
        password: newUSer.password,
      },
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
     return res.status(400).json({ message: "No User Found" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password)
    if (!passwordMatched) {
    return  res.status(400).json({ message: "Wrong Password" });
    }

    res.status(200).json({ message: "Login Successful", user: user });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
