var express = require('express');
const router = express.Router();
var exportCtrl = require('../controller/export.controller');

router.get("/export/books" , exportCtrl.exportBooks);
module.exports = router