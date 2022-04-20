const res = require('express/lib/response')
const LandingModel = require('../modules/landings')
const landingModules = require('../modules/landingsQuerys')
require('mongoose');

/**Descripción de la función: If the query contains mass it creates an equal or greater filter and looks up in the data base for landings with that value. Else it looks up as per the dates specified */

const getLandingsByQuery = async (req, res) => {
    console.log("mass request", req.query.mass)
    const mass = parseInt(req.query.mass)
    console.log("mass", mass)
    let filter = {}
    if (mass) {
        try {
            const landings = await landingModules.getLandingsAboveSpecificMass(mass);
            res.status(200).json(landings)
        } catch (err) {
            res.status(400).json({ msg: err })
        }

    } else {
        const from = req.query.from
        const to = req.query.to
        try {
            const result = await landingModules.getLandingsBetweenDates(from, to)
            res.status(200).json({ msg: result })
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: "Bad Request" })
        }

    }
}

const getLandingsBySpecificMass = async (req, res) => {
    try {
        const mass = parseInt(req.params.mass)
        const filter = { mass: mass }
        const query = await LandingModel.find(filter).exec();
        if (query == 0) {
            res.status(200).json({ msg: "No landings for the mass provided" })
        } else {
            res.status(200).json(query)
        }
    } catch (err) {
        console.log(err)
        res.status(400)
    }
}

const getLandingsByClass = async (req, res) => {
    try {
        const recclass = req.params.class
        const filter = { recclass: recclass }
        const query = await LandingModel.find(filter).exec();
        if (query == 0) {
            res.status(200).json({ msg: "No landings for the class provided" })
        } else {
            res.status(200).json(query)
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Bad Request" })
    }
}

const createLanding = async (req, res) => {
    const { name, id, nametype, recclass, mass, fall, year, reclat, reclong, geolocation } = req.body;
    try {
        const newLanding = new LandingModel(req.body);
        newLanding.save((err, newLanding) => {
            if (err) return console.error(err);
            console.log(`${newLanding.name} saved in landings collection`)
        })
        res.status(201).json({ msg: "createLanding" + req.body })
    } catch (err) {
        res.status(400).json({ msg: `error ${err}` })
    }
}

const editLanding = async (req, res) => {
    try {
        const { name, id, nametype, recclass, mass, fall, year, reclat, reclong, geolocation } = req.body;
        const update = req.body;
        const filter = { id: id }
        let landingToEdit = await LandingModel.findOneAndUpdate(filter, update, { new: true });
        res.status(201).json({ msg: `Landing ${filter.id} edited, saved data: ` + landingToEdit })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Bad Request" })
    }
}

const deleteLanding = async (req, res) => {
    try {
        const { id } = req.body
        const filter = { id: id }
        LandingModel.deleteOne(filter, function (err) {
            if (err) return handleError(err);
        });
        res.status(200).json({ msg: `landing with id: ${id} has been deleted` })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Bad Request" })
    }
}




const controllers = {
    getLandingsByQuery,
    getLandingsBySpecificMass,
    getLandingsByClass,
    createLanding,
    editLanding,
    deleteLanding,
}

module.exports = controllers