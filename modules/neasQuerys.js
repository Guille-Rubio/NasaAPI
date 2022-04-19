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
    // DOES NOT WORK PROPERLY YET
    console.log("from " + from, "to " + to)
    const dateFrom = new Date(from);
    const dateTo = to ? new Date(to) : new Date()
    console.log("FROM", dateFrom)
    console.log("TO", dateTo)
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

    }

}


const neasQuerys = {
    getNeasByQuery,
    getNeasBetweenDates
}

module.exports = neasQuerys;

