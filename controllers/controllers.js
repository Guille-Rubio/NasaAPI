const res = require('express/lib/response')
const nasaAPI = require('../utils/fetchNasaApi')
const LandingModel = require ('../modules/landings')
const NeoModel = require('../modules/neos')   


const getLanding = async (req,res) => {

    const {mass, recclass, start_date:dateFrom, end_date:dateTo} = req.query;

    await LandingModel.find({});
   


    //choose apropriate model for query
    

    console.log(mass, recclass, dateFrom, dateTo)
  
 
    res.status(200).json({msg:"Landings"})
}


const getNea = async (req, res) => {
    console.log('getNea')
   
   
    res.status(200).json({msg:"neas"});
}


const controllers = {
    getNea,
    getLanding
}

module.exports = controllers