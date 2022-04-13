const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers')


router.get('/', (req, res) => {
    res.json({ msg: "You are in" });

})

//landings
router.get('/astronomy/landings?minimum_mass', controllers.getLandingsByMinMass)
router.get('/astronomy/landings/mass/:mass', controllers.getLandingsBySpecificMass)
router.get('/astronomy/landings/class/:class', controllers.getLandingsByClass)
router.get('/astronomy/landings?from&to', controllers.getLandingsByDate)
router.post('/astronomy/landings/create', controllers.createLanding)
router.put('/astronomy/landings/edit', controllers.editLanding)
router.delete('/astronomy/landings/delete', controllers.deleteLanding)

//NEas //Start with this query
router.get('/astronomy/neas?', controllers.getNea);


module.exports = router;