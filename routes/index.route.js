let express = require("express");
let router = express.Router();

/** Home oage route */
router.get("/", (req,res) => {
    res.send("Welcome to TODO List App ");
})
module.exports = router;