import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  const passwordCheck = (user) => {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const jwtToken = await jwt.sign(
          {
            id: user.id,
            userName: user.userName,
            email: user.email,
            phone: user.phone
          },
          "secret-key"
        );
        return res.status(200).send({ jwtToken });
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
        passwordCheck(emailExisted);
      } else {
        return res.status(404).send("Email Not Found");
      }
    } else {
      const phone = Number(credential);
      const phoneExisted = await Users.findOne({ where: { phone: phone } });
      if (phoneExisted) {
        passwordCheck(phoneExisted);
      } else {
        return res.status(404).send("Phone Number Not Found");
      }
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
