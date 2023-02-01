import GroupAdmins from "../modals/groupAdminModal.js";
import Group from "../modals/groupModal.js";
import GroupMsgs from "../modals/groupMsgsModal.js";
import GroupUsers from "../modals/groupUsersModal.js";
import Users from "../modals/UserModal.js";

export const createGroup = async (req, res) => {
  const { groupName, userId, userName } = req.body;
  try {
    const response1 = await Group.create({
      groupName: groupName,
      adminId: userId,
      adminUser: userName,
      userName: userName
    });
    const response2 = await GroupUsers.create({
      groupId: response1.id,
      userId: userId,
      groupName: groupName,
      userName: userName
    });
    const response3 = await GroupAdmins.create({
      groupId: response1.id,
      userId: userId,
      groupName: groupName,
      adminName: userName
    });
    res.status(200).send(response3);
  } catch (error) {}
};

export const fetchGroups = async (req, res) => {
  const { userid } = req.headers;
  const groupData = await GroupUsers.findAll({ where: { userId: userid } });
  res.status(200).send(groupData);
};

export const addGroupMember = async (req, res) => {
  const { groupId, groupName } = req.body;
  try {
    const userExists = await Users.findOne({
      where: { userName: req.body.userName }
    });
    if (!!userExists) {
      const groupCreated = await GroupUsers.create({
        groupName: groupName,
        groupId: groupId,
        userId: userExists.id,
        userName: userExists.userName
      });
      return res.status(200).send(groupCreated);
    }
  } catch (error) {
    res.status(404).send("Some Error Happened");
  }
};

export const fetchGroupMembers = async (req, res) => {
  const { groupid } = req.headers;
  try {
    const groupUsersData = await GroupUsers.findAll({
      where: { groupId: groupid },
      attributes: ["userId", "userName"]
    });
    res.status(200).send(groupUsersData);
  } catch (error) {
    console.log(error);
    res.status(401).send("Cannot Get Group Data");
  }
};

export const sendGroupMessage = async (req, res) => {
  const { groupId, groupName, message, userId, userName } = req.body;
  const response = await GroupMsgs.create({
    groupId: groupId,
    groupName: groupName,
    message: message,
    userId: userId,
    userName: userName
  });
  res.status(200).send(response);
};

export const fetchGroupMessages = async (req, res) => {
  const { groupid } = req.headers;
  const groupChatData = await GroupMsgs.findAll({
    where: { groupId: groupid },
    order: [["createdAt", "ASC"]]
  });
  res.status(200).send(groupChatData);
};

export const groupAdminCheck = async (req, res) => {
  const { groupid, userid } = req.headers;
  try {
    const isAdminData = await GroupAdmins.findAll({
      where: { groupId: groupid },
      attributes: ["userId"]
    });
    const adminUsersId = isAdminData.map((user) => user.userId);
    res.status(200).send(adminUsersId);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const makeGroupAdmin = async (req, res) => {
  const { userId, userName, groupId, groupName } = req.body;
  try {
    const response = await GroupAdmins.create({
      groupId: groupId,
      userId: userId,
      groupName: groupName,
      adminName: userName
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const removeGroupMember = async (req, res) => {
  const { userId, groupId } = req.body;
  try {
    await GroupUsers.destroy({
      where: {
        userId: userId,
        groupId: groupId
      }
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(401).send("Error while removing user..");
  }
};
