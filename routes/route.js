const router = require('express').Router();

const {formNotif} = require('../controller/appController');

// HTTP Request
//http://localhost:5000/api/formana/formNotif
router.post('/formana/formNotif', formNotif);


module.exports = router;