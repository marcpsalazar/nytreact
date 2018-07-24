const router = require("express").Router();
const booksController = require("../../controllers/articleController");


router.route("/")
  .get(aticleController.findAll);
  .post(articleController.create);

router.route("/:id")
  .delete(booksController.remove);

module.exports = router;
