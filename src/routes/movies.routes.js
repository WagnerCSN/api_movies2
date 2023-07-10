const Router = require("express");
const MoviesController = require("../controllers/MoviesController");
const moviescontroller = new MoviesController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const moviesRoutes = Router();

moviesRoutes.use(ensureAuthenticated);

moviesRoutes.get("/", moviescontroller.index)
moviesRoutes.post("/", moviescontroller.create)
moviesRoutes.get("/:id", moviescontroller.show)
moviesRoutes.delete("/:id", moviescontroller.delete)

module.exports = moviesRoutes;