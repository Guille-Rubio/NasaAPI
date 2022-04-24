const res = require('express/lib/response')
const NeasModel = require('../modules/neas')

const getNeasByQuery = async (orbit_class) => {
    try {
        const agg = [
            {
                '$project':
                {
                    '_id': 0,
                    'designation': 1,
                    'period_yr': 1,
                    'orbit_class': 1
                }
            },
            {
                '$match': { 'orbit_class': orbit_class }
            }
        ]
        const result = NeasModel.aggregate(agg);
        return result;

    } catch (err) {
        res.status(400).json({ msg: "Query failed" })
    }
}

const getNeasBetweenDates = async (from, to) => {
    let dateFrom = from ? new Date(`${from}T00:00:00.000Z`) : new Date(0000);
    let dateTo = to ? new Date(`${to}T00:00:00.000Z`) : new Date();
    if (dateFrom > dateTo) {    
        return {"msg":"End date is sooner than start date "}
    }
    
    try {
        const agg = [
            {
                '$addFields':
                {
                    'date': { '$convert': { 'input': '$discovery_date', 'to': 'date' } }
                }
            },
            {
                '$project':
                {
                    '_id': 0,
                    'moid_au':0,
                    'q_au_1':0,
                    'q_au_2':0,
                    'period_yr':0,
                    'i_deg':0,
                    'pha':0,
                    'orbit_class':0   
                }
            },
            {
                '$match': { 'date': { '$gte': dateFrom, '$lte': dateTo } }
            },
            {
                '$sort': { 'date': -1 }
            }
        ]
        const result = NeasModel.aggregate(agg);
        return result;

    } catch (err) {
        throw err
    }
}


const neasQuerys = {
    getNeasByQuery,
    getNeasBetweenDates
}

module.exports = neasQuerys;

