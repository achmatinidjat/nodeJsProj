const express = require("express");
const coursesController = require("../controllers/course");
const isAdmin = require("../middleware/isAdmin");
const isUser = require("../middleware/isUser");
const validate = require("../middleware/validate");
const coursesScheme = require("../schemes/course");
const multer = require('multer');
const storage = require("../config").storage;
const fileFilter = require("../config").fileFilter;
const limits = require("../config").limits;
const upload = multer({storage: storage, fileFilter: fileFilter, limits: limits});

const router = express.Router();

router.get("/", coursesController.list);
router.get("/search/tags", coursesController.searchByTags);
router.get("/search", coursesController.searchByName);
router.get("/:id/image", coursesController.getImage);
router.post("/:id/image", upload.single('image'), coursesController.setImage);
router.put("/:id/mark", isUser, coursesController.setMark);
router.delete("/:id/mark", isUser, coursesController.deleteMark);
router.use(isAdmin);
router.get("/:id/tags", coursesController.listTags);
router.post("/:id/tags", coursesController.addTag);
router.delete("/:id/tags", coursesController.deleteTag);
router.post("/", validate(coursesScheme.create), coursesController.create);
router.put("/:id", validate(coursesScheme.update), coursesController.update);
router.delete("/:id", coursesController.delete);


module.exports = router;
