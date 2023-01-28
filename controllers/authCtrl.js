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

export const signInDataPost = async (req, res) => {
  const { credential, password } = req.body;
  const passwordCheck = (userPassword) => {
    bcrypt.compare(password, userPassword, (err, result) => {
      if (result) {
        return res.sendStatus(200);
      } else {
        return res.status(401).send("Password Incorrect");
      }
    });
  };
  try {
    if (credential.includes("@")) {
      const emailExisted = await Users.findOne({
        where: { email: credential }
      });
      if (emailExisted) {
        passwordCheck(emailExisted.password);
      } else {
        return res.status(401).send("Email Not Found");
      }
    } else {
      const phone = Number(credential);
      const phoneExisted = await Users.findOne({ where: { phone: phone } });
      if (phoneExisted) {
        passwordCheck(phoneExisted.password);
      } else {
        return res.status(401).send("Phone Number Not Found");
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
