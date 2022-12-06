const express = require("express");
const {
  signup,
  signin,
  signout,
  getusers,
  deleteUser,
} = require("../../controller/admin/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth");
const { requireSignin } = require("../../common-middleware");
const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
router.delete("/admin/:id", deleteUser);
router.get("/admin/", getusers);
router.post("/admin/signout", signout);

module.exports = router;
