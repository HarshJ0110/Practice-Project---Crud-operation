const express = require("express");
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUsers } = require("../controllers/user.controller.js");

router.route("/user").post(createUser).get(getUsers);
router.route("/users/:id").post(updateUser).delete(deleteUsers);

module.exports = router;

