const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require("../controllers/UsersController");
require("dotenv").config();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", usersController.logout);

router.get("/login/success", usersController.googleLoginSuccess);

router.get("/login/failed", usersController.googleLoginFailed);

router.get("/logout", usersController.logout);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
module.exports = router;
