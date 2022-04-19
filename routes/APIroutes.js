const express = require('express');
const router = express.Router();
const landings = require('../controllers/landings')
const neas = require('../controllers/neas')


//landings
router.get('/astronomy/landings/?', landings.getLandingsByQuery)
router.get('/astronomy/landings/mass/:mass', landings.getLandingsBySpecificMass)
router.get('/astronomy/landings/class/:class', landings.getLandingsByClass)
router.post('/astronomy/landings/create', landings.createLanding)
router.post('/astronomy/landings/edit', landings.editLanding)
router.post('/astronomy/landings/delete', landings.deleteLanding)

//NEas //Start with this query
router.get('/astronomy/neas?', neas.getNeasByQuery);
router.post('/astronomy/neas/create', neas.createNea)
router.get('/astronomy/neas/editdesignation', neas.getNeaToEdit)
router.post('/astronomy/neas/edit', neas.editNea)
router.post('/astronomy/neas/delete', neas.deleteNea)







module.exports = router;