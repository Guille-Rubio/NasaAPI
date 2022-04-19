const neasQuerys = require('../modules/neasQuerys')
const NeasModel = require('../modules/neas')
const neasModel = require('../modules/neas')

const getNeasByQuery = async (req, res) => {
    const orbit_class = req.query.class
    if (orbit_class) {
        const result = await neasQuerys.getNeasByQuery(orbit_class)

        res.status(200).json({ msg: result });
    } else {
        const dateFrom = req.query.from;
        const dateTo = req.query.to;
        const result = await neasQuerys.getNeasBetweenDates(dateFrom, dateTo)
        res.status(200).json({ msg: result });

    }
}

const createNea = async (req, res) => {
    const { designation, discovery_date, h_mag, moid_au, q_au_1, q_au_2, period_yr, i_deg, pha, orbit_class, date } = req.query;
    console.log(req.query)
    try {
        const newNea = new neasModel(req.query);
        newNea.save((err, newNea) => {
            if (err) return console.error(err);
            console.log(`${newNea.name} saved in landings collection`)
        })
        res.status(201).json({ msg: "New Nea added: " + req.body })
    } catch (err) {
        res.status(400).json({ msg: `error ${err}` })
    }

    console.log('getNea')

    res.status(200).json({ msg: "neas" });
}

const getNeaToEdit = async (req, res) => {
    console.log('getNea')

    res.status(200).json({ msg: "neas" });
}


const editNea = async (req, res) => {
    console.log('getNea')

    res.status(200).json({ msg: "neas" });
}

const deleteNea = async (req, res) => {
    try {
        const { designation } = req.query
        const filter = { designation: designation }
        neasModel.deleteOne(filter, function (err) {
            if (err) return handleError(err);
        });
        res.status(200).json({ msg: `neas with designation: ${designation} has been deleted` })
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Bad Request" })
    }


    res.status(200).json({ msg: "neas" });
}


const neas = {
    getNeasByQuery,
    createNea,
    getNeaToEdit,
    editNea,
    deleteNea
}

module.exports = neas