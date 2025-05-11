const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

//LOGIN
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı!" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Şifre hatalı!" });
    }
    return res.status(200).json({ message: "Giriş başarılı!", user });
  } catch (error) {
    return res.status(500).json({ message: "[USERS_POST]" });
  }
});
//REGISTER
router.post("/auth/register", async (req, res) => {
  const generateAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 9999);
    return `https://i.pravatar.cc/300?img=${randomNumber}`;
  };
  try {
    const { username, email, password } = req.body;
    const defaultAvatar = generateAvatar();
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun!" });
    }
    const newUser = await new User({
      ...req.body,
      avatar: defaultAvatar,
      password: bcrypt.hashSync(password, 10),
    });
    await newUser.save();
    return res.status(201).json(newUser, { message: "Kullanıcı Eklendi!" });
  } catch (error) {
    return res.status(500).json({ message: "[USERS_POST]" });
  }
});
module.exports = router;
