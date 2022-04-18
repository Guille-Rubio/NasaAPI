const Landings = require('./landings');
const dayjs = require('dayjs');

const getLandingsAboveSpecificMass = async (min_mass) => {
    try {
        const agg = [
            {
                '$project':
                {
                    '_id': 0,
                    'name': 1,
                    'mass': 1
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
                }
            },
            {
                '$match': { 'date': { '$gte': dateFrom, '$lt': dateTo } }
            },
            {
                '$sort': { 'year': -1 }
            }
        ]
        const result = Landings.aggregate(agg);
        console.log("Query result" + result)
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