const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags that include its associated Product data
  let tags = await Tag.findAll({ include: Product });
  res.json(tags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id` and it include its associated Product data
  var id = req.params.id;
  let tags = await Tag.findByPk(id, {
    include: Product,
  });
  res.json(tags);
});

router.post("/", async (req, res) => {
  // creating a new tag
  try {
    const tags = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!tags) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
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
