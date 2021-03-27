var express = require('express');
const router = express.Router();
var loginCtrl = require('../controller/login.controller');
var jwtUtil = require('../Util/jwtUtil');

router.get("/login/profile/:userId" , jwtUtil.verifyToken(["admin"]) , loginCtrl.getUserProfile);
router.post("/login/signIn" , loginCtrl.signIn);
module.exports = router