const router = require("express").Router();
const {
  getbill,
  signup,
  sendEmail,
  sendRealEmail,
} = require("../controller/controller.js");

// ** HTTP REQUEST **
router.post("/sendEmail", sendEmail);
router.post("/sendRealEmail", sendRealEmail);
router.post("/signup", signup);
router.post("/getbill", getbill);

module.exports = router;
