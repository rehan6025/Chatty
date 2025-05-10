const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//function to check if a chat exists , if not create a new chat
const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  //query to check if chat exists, elemMatch is used to check if both users are present in the chat, $and does this , req.user._id is the logged in user , provided by the middleware
  const query = {
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  };

  //find the chat from database using the query
  //populate the users and latestMessage fields
  //latestMessage is populated with the sender field because we need to show the name and pic of the sender in the chat list
  var isChat = await Chat.find(query)
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  //if chat exists, send the chat otherwise create a new chat , find the new chat using the id of the created chat, populate it and send it
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chat: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    console.log("error:: chatcontrollers::fetchChats", error);
    res.status(400).send({ message: "Error Fetching Chats" });
  }
};

const createGroupChat = async (req, res) => {
  if (!req.body.name || !req.body.users) {
    return res.status(400).send({ message: "Please fill all the fields." });
  }

  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chat: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const createdGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(createdGroupChat);
  } catch (error) {
    console.log("error:: chatcontrollers::createGroupChat", error);
    res.status(400).send({ message: "Error creating group chat" });
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chat: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404).send({ message: "Chat not found" });
  } else {
    res.status(200).json(updatedChat);
  }
};

const removeFromGroup = async (req, res) => {
  const { userId, chatId } = req.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404).send({ message: "Chat not found" });
  } else {
    res.status(200).json(removed);
  }
};

const addToGroup = async (req, res) => {
  const { userId, chatId } = req.body;
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404).send({ message: "Chat not found" });
  } else {
    res.status(200).json(added);
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
