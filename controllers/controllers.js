const res = require('express/lib/response')
const nasaAPI = require('../utils/fetchNasaApi')
const LandingModel = require('../modules/landings')
const NeoModel = require('../modules/neos')
require('mongoose');

const getLandingsByMinMass = async (req, res) => {
    const {recclass, start_date: dateFrom, end_date: dateTo } = req.query;
    const mass = parseInt(req.query.mass)

    console.log("mass", mass)
    const filter = { mass: {$gt: mass} }
    const query = await LandingModel.find(filter).exec();
    console.log(mass, recclass, dateFrom, dateTo)
    res.status(200).json({ msg: query })
}

const getLandingsBySpecificMass = async (req, res)=>{
    res.status(200).json({msg:"getLandingsBySpecificMass"})

}

const getLandingsByClass = async (req, res)=>{
    res.status(200).json({msg:"getLandingsByClass"})
}

const getLandingsByDate = async (req, res)=>{
    res.status(200).json({msg:"getLandingsByDate"})
}

const createLanding = async (req, res)=>{
    res.status(201).json({msg:"createLanding"})
}

const editLanding = async (req, res)=>{
    res.status(201).json({msg:"editLanding"})
}

const deleteLanding = async (req, res)=>{
    res.status(201).json({msg:"editLanding"})
}

const getNea = async (req, res) => {
    console.log('getNea')

    res.status(200).json({ msg: "neas" });
}


const controllers = {
    getLandingsByMinMass,
    getLandingsBySpecificMass,
    getLandingsByClass,
    getLandingsByDate,
    createLanding,
    editLanding,
    deleteLanding,
    getNea, 
}

module.exports = controllers