const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

//CATEGORİES
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: "Kategori bulunamadı!" });
    }
    return res
      .status(200)
      .json(categories, { message: "Kategoriler Listelendi!!" });
  } catch (error) {
    return res.status(500).json({ message: "[GET_CATEGORİES]" });
  }
});
router.post("/categories", async (req, res) => {
  try {
    const { name, img } = req.body;
    if (!name || !img) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun!" });
    }
    const newCategory = await new Category({ name, img });
    await newCategory.save();
    return res.status(201).json(newCategory, { message: "Kategori Eklendi!" });
  } catch (error) {
    return res.status(500).json({ message: "[POST_CATEGORİES]" });
  }
});

//CATEGORİES_DETAİLS
router.get("/categories/:categoriesId", async (req, res) => {
  try {
    const { categoriesId } = req.params;
    const category = await Category.findById(categoriesId);
    if (!category) {
      return res.status(404).json({ message: "Kategori bulunamadı!" });
    }
    return res.status(200).json(category, { message: "Kategori bulundu!" });
  } catch (error) {
    return res.status(500).json({ message: "[GET_CATEGORİES_ID]" });
  }
});
router.put("/categories/:categoriesId", async (req, res) => {
  try {
    const { categoriesId } = req.params;
    const updatedCategory = req.body;
    if (!categoriesId) {
      return res.status(400).json({ message: "Geçersiz Id" });
    }
    if (!updatedCategory.name === "" || !updatedCategory.img === "") {
      return res
        .status(400)
        .json({ message: "Lütfen Gerekli Alanları DDoldurunuz!" });
    } else {
      const category = await Category.findByIdAndUpdate(
        categoriesId,
        updatedCategory,
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json(category, { message: "Kategori güncellendi!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "[PUT_CATEGORİES_ID]" });
  }
});
router.delete("/categories/:categoriesId", async (req, res) => {
  try {
    const { categoriesId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoriesId);
    if (!deletedCategory) {
      return res.status(401).json({ message: "Kategori bulunamadı!" });
    }
    return res
      .status(200)
      .json(deletedCategory, { message: "Kategori Silindi!" });
  } catch (error) {
    return res.status(500).json({ message: "[DELETE_CATEGORİES_ID]" });
  }
});
module.exports = router;
