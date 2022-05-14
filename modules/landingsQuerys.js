const Landings = require('../models/landings');
const dayjs = require('dayjs');
const res = require('express/lib/response');

const getLandingsAboveSpecificMass = async (min_mass) => {
    try {
        const agg = [
            {
                '$project':
                {
                    '_id': 0,
                    'name': 1,
                    'mass': 1,
                    'geolocation':1
                }
            },
            {
                '$match': { '$expr': { '$gte': [{ '$toDecimal': '$mass' }, min_mass] } }
            }
        ];
        const result = Landings.aggregate(agg);
        return result;
    } catch (error) {
        console.log(err);
        throw err;
    }
}

const getLandingsBetweenDates = async (from, to) => {
    let dateFrom = from? new Date(`${from}T00:00:00.000Z`):new Date(0000);
    let dateTo = to ? new Date(`${to}T00:00:00.000Z`) : new Date();
    if (dateFrom > dateTo) {
        throw error
    } 
   
    try {
        const agg = [
            {
                '$addFields':
                {
                    'date': { '$convert': { 'input': '$year', 'to': 'date' } }
                }
            },
            {
                '$project':
                {
                    '_id': 0,
                    'name': 1,
                    'mass': 1,
                    'date': 1,
                    'geolocation':1,
                }
            },
            {
                '$match': { 'date': { '$gte': dateFrom, '$lte': dateTo } }//ISO Date
            },
            {
                '$sort': { 'year': -1 }
            }
        ]
        const result = await Landings.aggregate(agg);
        return result;
    }

    catch (err) {
        console.log(err)
    }
}

const landings = {
    getLandingsAboveSpecificMass,
    getLandingsBetweenDates
}

module.exports = landings