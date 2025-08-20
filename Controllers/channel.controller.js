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
