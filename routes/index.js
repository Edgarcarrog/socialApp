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

router.get("/photos", (req, res)=>{
    res.render("photos");
});

router.get('*', (req, res) => {
    res.send('La página no existe');
  });

module.exports = router;