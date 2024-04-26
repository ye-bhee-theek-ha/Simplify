const express = require("express");
const { registerUser, loginUser, forgotPassword, resetPassword, confirm, getDetails, uploadImg, updateDetails, ChangePassword} = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/confirm/:confirmationToken").post(confirm);

router.route("/login").post(loginUser);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword").post(resetPassword);

router.route("/ChangePassword").post(ChangePassword);

router.route("/getDetails").post(getDetails);

router.route("/imgUpload").post(uploadImg)

router.route("/updateDetails").post(updateDetails)

module.exports = router