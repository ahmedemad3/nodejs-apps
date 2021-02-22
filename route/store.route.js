var express = require('express');
const router = express.Router();
var storeCtrl = require('../controller/store.controller');

router.get("/stores" , storeCtrl.getStoreList);
router.post("/stores/save" , storeCtrl.saveStore);

module.exports = router