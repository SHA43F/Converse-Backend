import Friends from "../modals/friendModal.js";
import Users from "../modals/UserModal.js";

export const fetchFriendsList = async (req, res) => {
  const { userid } = req.headers;
  try {
    const response = await Users.findAll({
      where: { id: userid },
      include: ["friendsList"]
    });
    res.status(201).send(response[0].dataValues.friendsList);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const addFriend = async (req, res) => {
  const { friendName, userName, userId } = req.body;

  const findUser = await Users.findOne({
    where: { userName: friendName }
  });

  if (!!findUser) {
    if (findUser.id === userId) {
      return res.status(400).send("User can't make self request..");
    }
    console.log("asdfg", findUser.id);

    const response2 = await Friends.findOne({
      where: { userId: userId, friendId: findUser.id }
    });

    if (!!response2) {
      return res.status(400).send("User is already your friend");
    }
    const makeFriend = await Friends.bulkCreate([
      {
        userId: userId,
        friendId: findUser.id
      },
      {
        userId: findUser.id,
        friendId: userId
      }
    ]);
    return res.status(200).send("Successfully added as a friend");
  } else {
    return res.status(400).send("User doesn't exists, Enter a valid username");
  }
};
