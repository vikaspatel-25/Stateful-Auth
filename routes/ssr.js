const express = require("express");
const { authoriseUser } = require("../controllers/routehandler");
const router = express.Router()

router.route("/")
.get(authoriseUser)

router.route("/home")
.get(authoriseUser)

router.route("/login")
.get(authoriseUser)

router.route("/signup")
.get((req,res)=>{
    return res.render("signup");
})



module.exports = router;