import Group from "../modals/groupModal.js";
import GroupMsgs from "../modals/groupMsgsModal.js";
import GroupUsers from "../modals/groupUsersModal.js";
import Users from "../modals/UserModal.js";

export const createGroup = async (req, res) => {
  const { groupName, userId, userName } = req.body;
  const response1 = await Group.create({
    groupName: groupName,
    totalUsers: 1,
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
  res.status(200).send(response2);
};

export const fetchGroups = async (req, res) => {
  const { userid } = req.headers;
  const groupData = await GroupUsers.findAll({ where: { userId: userid } });
  res.status(200).send(groupData);
};

export const addGroupMember = async (req, res) => {
  const { groupId, groupName } = req.body;
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
  res.status(404).send("User not found");
};

export const fetchGroupMembers = async (req, res) => {
  const { groupid } = req.headers;
  console.log("asdfghj", groupid);
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
    where: { groupId: groupid }
  });
  res.status(200).send(groupChatData);
};
