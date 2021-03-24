var express = require('express');
const router = express.Router();
var userCtrl = require('../controller/user.controller');

router.get("/users" , userCtrl.getUserList);
router.post("/users/save" , userCtrl.saveUser);
module.exports = router