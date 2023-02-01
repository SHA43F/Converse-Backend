import Chat from "../modals/chatModal.js";
import Users from "../modals/UserModal.js";

export const storeChatData = async (req, res) => {
  const { userId, message, toId, toName, userName } = req.body;
  try {
    const response = await Chat.create({
      message: message,
      userId: userId,
      userName: userName,
      toId: toId,
      toName: toName
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const fetchChatData = async (req, res) => {
  const { userid, toid } = req.headers;
  const chatData = await Chat.findAll({
    where: { userId: [userid, toid], toId: [userid, toid] },
    order: [["createdAt", "ASC"]]
  });
  res.status(200).send(chatData);
};
