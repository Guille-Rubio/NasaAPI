const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers')


router.get('/', (req, res) => {
    res.json({ msg: "You are in" });

})

//landings
router.get('/astronomy/landings?', controllers.getLanding)

//NEas //Start with this query
router.get('/astronomy/neas?',controllers.getNea);


module.exports = router;