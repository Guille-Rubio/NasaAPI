

const getNeaByQuery = async (req, res) => {
    console.log('getNea')

    res.status(200).json({ msg: "neas" });
}

const createNea = async (req, res) => {
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
    console.log('getNea')

    res.status(200).json({ msg: "neas" });
}


const neas = {
    getNeaByQuery,
    createNea,
    getNeaToEdit,
    editNea,
    deleteNea
}

module.exports = neas