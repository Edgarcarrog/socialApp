const express = require("express");
const router = express.Router();

const {
    loginGet,
    profileGet,
    registerGet,
    registerPost
} = require("../controllers/controller");

router.get("/", (req, res)=>{
    res.send("Funciona");
});

router.get("/register", registerGet);

router.post("/register", registerPost);

router.get("/login", loginGet);

/* router.post("/create", createPost);*/

router.get("/profile", profileGet);

router.get("/photos", (req, res)=>{
    res.render("photos");
});

module.exports = router;