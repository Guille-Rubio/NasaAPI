const neasQuerys = require('../modules/neasQuerys')
const NeasModel = require('../modules/neas')


const getNeasByQuery = async (req, res) => {
    const orbit_class = req.query.orbit_class
    if (orbit_class) {
        const result = await neasQuerys.getNeasByQuery(orbit_class)
        res.status(200).json(result);

    } else if (from||to){
        const { from, to } = req.query
        const result = await neasQuerys.getNeasBetweenDates(from, to)
        res.status(200).json(result);
    }else {
        res.status(400).json({msg:"Bad request"});
    }
}

const createNea = async (req, res) => {
    const { designation, discovery_date, h_mag, moid_au, q_au_1, q_au_2, period_yr, i_deg, pha, orbit_class, date } = req.body;
    //validaciones
    try {
        const newNea = new NeasModel(req.body);
        newNea.save((err, newNea) => {
            if (err) return console.error(err);
            console.log(`${newNea.designation} saved in neas collection`)
        })
        res.status(201).json({ msg: "New Nea added: " + req.body })
    } catch (err) {
        res.status(400).json({ msg: `error ${err}` })
    }

}

const editNea = async (req, res) => {
    try {
        const { _id } = req.body
        const filter = { id: _id }
        const { designation, discovery_date, h_mag, moid_au, q_au_1, q_au_2, period_yr, i_deg, pha, orbit_class } = req.body

        const update =  {
            designation: designation,
            discovery_date: discovery_date,
            h_mag: h_mag,
            moid_au: moid_au,
            q_au_1: q_au_1,
            q_au_2: q_au_2,
            period_yr: period_yr,
            i_deg: i_deg,
            pha: pha,
            orbit_class: orbit_class
        }

        const doc = await NeasModel.findOneAndUpdate(filter, update, { new: false });
        await doc.save()

        res.status(201).json({ msg: `Neas` })
    } catch (err) {
        res.status(400).json({ msg: "Bad Request", err: err })
    }
}

const deleteNea = async (req, res) => {
    try {
        const { designation } = req.body
        const filter = { designation: designation }
        NeasModel.deleteOne(filter, function (err) {
            if (err) return handleError(err);
        });
        res.status(200).json({ msg: `neas with designation: ${designation} has been deleted` })
    } catch (err) {
        res.status(400).json({ msg: "Bad Request" })
    }
}


const neas = {
    getNeasByQuery,
    createNea,
    editNea,
    deleteNea
}

module.exports = neas