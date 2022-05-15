const express = require('express');
const apiRouter = express.Router();
const landings = require('../controllers/landings')
const neas = require('../controllers/neas')

apiRouter.get('/astronomy/landings/?', landings.getLandingsByQuery);
apiRouter.get('/astronomy/landings/mass/:mass', landings.getLandingsBySpecificMass);
apiRouter.get('/astronomy/landings/class/:class', landings.getLandingsByClass);
apiRouter.post('/astronomy/landings/create', landings.createLanding);
apiRouter.put('/astronomy/landings/edit', landings.editLanding);
apiRouter.delete('/astronomy/landings/delete', landings.deleteLanding);

apiRouter.get('/astronomy/neas/', neas.getAllNeas);
apiRouter.get('/astronomy/neas/?', neas.getNeasByQuery);
apiRouter.post('/astronomy/neas/create', neas.createNea);
apiRouter.put('/astronomy/neas/edit/', neas.editNea);
apiRouter.delete('/astronomy/neas/delete', neas.deleteNea);

module.exports = apiRouter;