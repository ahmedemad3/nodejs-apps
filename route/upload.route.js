var express = require('express');
const router = express.Router();
var uploadCtrl = require('../controller/upload.controller');

router.post("/upload/file" , uploadCtrl.uploadFile);
module.exports = router