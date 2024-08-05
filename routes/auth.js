const express = require("express");
const router = express.Router();
const {handleSignup, handleLogin} = require("../controllers/routehandler");
const { authoriseUser } = require("../controllers/routehandler");
const bodyParser = require('body-parser');


router.route("/home")
.get(authoriseUser);

router.route("/login")
.get((req,res)=>{return res.redirect("../login")})
.post(handleLogin)

router.route("/signup")
.get((req,res)=>{return res.redirect("../signup")})
.post(handleSignup)


module.exports = router;