import bcrypt from "bcrypt";
import Users from "../modals/UserModal.js";

export const signUpDataPost = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const saltRounds = 10;
  try {
    const genSalt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    await Users.create({
      userName: name,
      email: email,
      phone: phone,
      password: hashedPassword
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(409).send(error);
  }
};
