const express = require("express");
// créer routeur un comboson express
const routeur = express.Router();
const tweetsController=require("../controllers/tweetscontroller")
const userController=require("../controllers/userController");
const isAuth = require("../middlewares/isAuth");

 routeur.get("/home",isAuth,tweetsController.findAllTweets)
 routeur.get("/",userController.loginPage)
 routeur.post("/home",isAuth,tweetsController.newTweet)
// routeur for get signUp page
routeur.get("/signup",userController.signup)
// routeur for post information in signup
routeur.post("/signup",userController.newUser)
// rout pour myTweet
routeur.get('/myTweet',isAuth,tweetsController.findUserTweets)
routeur.get("/logout",userController.logout)
// router for get login page

// router for login utilisatuer
routeur.post("/login",userController.authenticate)


module.exports = routeur;