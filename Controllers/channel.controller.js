import Channel from "../Schema/channel.schema.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, channelHandle } = req.body;

    const newChannel = new Channel({
      channelName: channelName,
      channelHandle: channelHandle,
      channelOwner: req.user.id
    });

    req.user

    await newChannel.save();

    res.status(200).json({message: "Channel Created", channel: newChannel})
  } catch (error) {
     res.status(400).json(error.message)
  }
};
