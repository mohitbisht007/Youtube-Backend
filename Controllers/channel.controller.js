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

    const user = await User.findOneAndUpdate(
      {_id: owner},
      {$set: {hasChannel: true}},
      {new: true}
    )
    await user.save()
    await newChannel.save();

    res.status(200).json({message: "Channel Created", channel: newChannel})
  } catch (error) {
     res.status(400).json(error.message)
  }
};

export const getSingleChannel = async(req, res) => {
  try {
    const channelHandle = req.params.channelhandle;
    const userId = req.user.id
    const user = await User.findOne({userId})

    const channelData = await Channel.findOne({channelHandle}) 

    res.status(200).json({channelData: channelData, user: user})
  } catch (error) {
     res.status(400).json(error.message)
  }
}
