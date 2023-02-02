import Chat from "../modals/chatModal.js";
import Files from "../modals/fileSharingModal.js";
import Users from "../modals/UserModal.js";
import S3Services from "../services/S3Services.js";

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
  try {
    const chatData = await Chat.findAll({
      where: { userId: [userid, toid], toId: [userid, toid] },
      order: [["createdAt", "ASC"]]
    });
    res.status(200).send(chatData);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const sendFile = async (req, res) => {
  const { userId, fileUrl, fileName, toId, toName, userName } = req.body;
  try {
    const response = await Files.create({
      fileUrl: fileUrl,
      fileName: fileName,
      userId: userId,
      userName: userName,
      toId: toId,
      toName: toName
    });
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const fetchFile = async (req, res) => {
  const { userid, toid } = req.headers;
  try {
    const filesData = await Files.findAll({
      where: { userId: [userid, toid], toId: [userid, toid] },
      order: [["createdAt", "ASC"]]
    });
    res.status(200).send(filesData);
  } catch (error) {
    res.status(401).send(error);
  }
};
