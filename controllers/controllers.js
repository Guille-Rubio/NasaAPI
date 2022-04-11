const res = require('express/lib/response')
const nasaAPI = require('../utils/fetchNasaApi')


const getLanding = async (req,res) => {
    const landings = await nasaAPI.fetchLandings()
    console.log(landings)
    res.status(200).json(landings)
}


const getNea = async (req, res) => {
    let from = req.query.from
    let to = req.query.to
    const neas = await nasaAPI.fetchNeas(from, to)
    res.status(200).json({ neas });
}


const controllers = {
    getNea,
    getLanding
}

module.exports = controllers