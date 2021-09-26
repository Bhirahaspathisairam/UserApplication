const express = require("express");
const router = express.Router();

const {
  postUserDetails,
  getJobDetails,

  userRegister,
  loginUser,
} = require("../controllers/userController");

router.route("/user").post(postUserDetails);
router.route("/login").post(loginUser);
router.route("/jobDetails").get(getJobDetails);
router.route("/register").post(userRegister);

module.exports = router;
