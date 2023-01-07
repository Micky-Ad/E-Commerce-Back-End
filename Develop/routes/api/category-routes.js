const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let categories = await Category.findAll({ include: Product });
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  var id = req.params.id;
  let categories = await Category.findByPk(id, {
    include: Product,
  });
  res.json(categories);
});

router.post("/", async (req, res) => {
  // creating  a new category
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(
      { category_name: req.body.category_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!categories) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categories) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
