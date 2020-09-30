const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Here are your posts!');
});

module.exports = router;