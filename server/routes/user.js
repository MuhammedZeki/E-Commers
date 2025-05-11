const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "[USERS_GET]" });
  }
});
router.delete("/admin/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun!" });
    }
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
    }
    return res.status(201).json(deletedUser, { message: "Kullanıcı Silindi!" });
  } catch (error) {
    return res.status(500).json({ message: "[USERS_DELETE]" });
  }
});

module.exports = router;
