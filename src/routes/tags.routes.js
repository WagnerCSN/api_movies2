const Router = require("express");
const TagsController = require("../controllers/TagsController");
const tagscontroller = new TagsController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();


tagsRoutes.get("/", ensureAuthenticated, tagscontroller.index)


module.exports = tagsRoutes;
