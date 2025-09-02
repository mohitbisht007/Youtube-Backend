import Channel from "../Schema/channel.schema.js";
import { User } from "../Schema/user.schema.js";


//Create channel Logic
export const createChannel = async (req, res) => {
  try {
    const { channelName, channelHandle } = req.body;
    const owner = req.user.id

    if(!owner){
      res.status(401).json({message: "User Not Signed In (Invalid Token)"})
    }

    if(!channelName && !channelHandle){
      res.status(400).json({message: "Each Field is Required"})
    }

    const avatarUrl = req.file ? req.file.path : undefined

    const newChannel = new Channel({
      channelName: channelName,
      channelHandle: channelHandle,
      channelOwner: owner,
      channelAvatar: avatarUrl
    }); // created new Channel with channel Schema

     await newChannel.save(); //saved it on Atlas

     const updateData = {channel: newChannel._id}
     if(avatarUrl){
      updateData.avatar = avatarUrl
     } //updated avatar with default that i defined in Schema

    const user = await User.findOneAndUpdate(
      {_id: owner},
      {$set: updateData},
      {new: true}
    ) // updated user with channelId and channelAvatar has been set to UserAvatar as well

    res.status(201).json({message: "Channel Created, Redirecting to Your Channel Page", channel: newChannel})
  } catch (error) {
     res.status(500).json(error.message)
  }
};


//getting single channel through channelHandle
export const getSingleChannel = async(req, res) => {
  try {
    const channelHandle = req.params.channelhandle;
    const channelData = await Channel.findOne({channelHandle}).populate("videos")  //finding single channel with channelHandle

    if (!channelData) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json({channelData: channelData})
  } catch (error) {
     res.status(500).json(error.message)
  }
}



//subscribing Logic
export const subscribeChannel = async(req, res) => {
  try {
    const { channelId } = req.body; //finded channel with channelId
    const owner = req.user.id; // getting ownerId from stored token

    console.log("Subscribe request:", req.body, req.user)

    if (!channelId || !owner) {
      return res.status(400).json({ message: "Missing channelId or user" });
    }

    const user = await User.findByIdAndUpdate(
      owner,
      { $addToSet: { subscriptions: channelId } },
      { new: true }
    ); //adding channelId that a user has subscribed to subscriptions

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Channel.findByIdAndUpdate(channelId,
      {$inc: {subscribers: 1}},
      {new: true}
    ) // increasing channel subscribers

    res.status(200).json({ message: "Channel Subscribed", subscriptions: user.subscriptions });
  } catch (error) {
    res.status(500).json({ message: "Subscription failed", error: error.message });
  }
}

export const unSubscribeChannel = async(req, res) => {
  try {
    const { channelId } = req.body; // getting channelId from frontend
    const owner = req.user.id;

     if (!channelId || !owner) {
      return res.status(400).json({ message: "Missing channelId or user" });
    }

    const user = await User.findByIdAndUpdate(
      owner,
      { $pull: { subscriptions: channelId } },
      { new: true }
    ); // removing channelId fron subscriptions

     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Channel.findByIdAndUpdate(channelId,
      {$inc: {subscribers: -1}},
      {new: true}
    ) // decresing channel subscribers


    res.status(200).json({ message: "Channel Unsubscribed", subscriptions: user.subscriptions });
  } catch (error) {
    res.status(500).json({ message: "Subscription failed", error: error.message });
  }
}


//Editing Channel Data Logic
export const editChannel = async (req, res) => {
  try {
    const { channelName, channelDescription } = req.body;
    const channelHandle = req.params.channelhandle; // getting channleHandle through Params

    let updateData = { channelName, channelDescription }; //data i need to update

    if (req.file) {
      updateData.channelAvatar = req.file.path;
    } // if i have a file than setting channelAvatar to that

    const updatedChannel = await Channel.findOneAndUpdate(
      { channelHandle },
      updateData,
      { new: true }
    ); //updating the channel with new updatedData

    if (!updatedChannel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json({ message: "Channel updated", channel: updatedChannel });
  } catch (error) {
    res.status(500).json({ message: "Failed to update channel" });
  }
};

