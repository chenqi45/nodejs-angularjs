/**
 * Created by FunkySoya on 2015/8/30.
 */

var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:dir', function(req, res) {
    res.sendfile(path.join(__dirname, '../templates/'+req.params.dir));
});

module.exports = router;