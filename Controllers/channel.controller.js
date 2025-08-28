import Channel from "../Schema/channel.schema.js";
import { User } from "../Schema/user.schema.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, channelHandle } = req.body;
    const owner = req.user.id

    const newChannel = new Channel({
      channelName: channelName,
      channelHandle: channelHandle,
      channelOwner: owner
    });

     await newChannel.save();

    const user = await User.findOneAndUpdate(
      {_id: owner},
      {$set: {channel: newChannel._id}},
      {new: true}
    )

    await user.save()

    res.status(200).json({message: "Channel Created", channel: newChannel})
  } catch (error) {
     res.status(400).json(error.message)
  }
};

export const getSingleChannel = async(req, res) => {
  try {
    const channelHandle = req.params.channelhandle;
    const channelData = await Channel.findOne({channelHandle}).populate("videos") 

    res.status(200).json({channelData: channelData})
  } catch (error) {
     res.status(400).json(error.message)
  }
}

export const subscribeChannel = async(req, res) => {
  try {
    const { channelId } = req.body;
    const owner = req.user.id;

    console.log("Subscribe request:", req.body, req.user)

    if (!channelId || !owner) {
      return res.status(400).json({ message: "Missing channelId or user" });
    }

    const user = await User.findByIdAndUpdate(
      owner,
      { $addToSet: { subscriptions: channelId } },
      { new: true }
    );

    await Channel.findByIdAndUpdate(channelId,
      {$inc: {subscribers: 1}},
      {new: true}
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Channel Subscribed", subscriptions: user.subscriptions });
  } catch (error) {
    res.status(500).json({ message: "Subscription failed", error: error.message });
  }
}

export const unSubscribeChannel = async(req, res) => {
  try {
    const { channelId } = req.body;
    const owner = req.user.id;

    console.log("Subscribe request:", req.body, req.user)

    if (!channelId || !owner) {
      return res.status(400).json({ message: "Missing channelId or user" });
    }

    const user = await User.findByIdAndUpdate(
      owner,
      { $pull: { subscriptions: channelId } },
      { new: true }
    );

    await Channel.findByIdAndUpdate(channelId,
      {$inc: {subscribers: -1}},
      {new: true}
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Channel Unsubscribed", subscriptions: user.subscriptions });
  } catch (error) {
    res.status(500).json({ message: "Subscription failed", error: error.message });
  }
}

