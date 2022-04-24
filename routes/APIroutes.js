const express = require('express');
const router = express.Router();
const landings = require('../controllers/landings')
const neas = require('../controllers/neas')

router.get('/astronomy/landings/?', landings.getLandingsByQuery)
router.get('/astronomy/landings/mass/:mass', landings.getLandingsBySpecificMass)
router.get('/astronomy/landings/class/:class', landings.getLandingsByClass)
router.post('/astronomy/landings/create', landings.createLanding)
router.put('/astronomy/landings/edit', landings.editLanding)
router.delete('/astronomy/landings/delete', landings.deleteLanding)

router.get('/astronomy/neas/?', neas.getNeasByQuery);
router.post('/astronomy/neas/create', neas.createNea)
router.put('/astronomy/neas/edit/', neas.editNea)
router.delete('/astronomy/neas/delete', neas.deleteNea)

module.exports = router;