const fetch = require('node-fetch');
const API_KEY = process.env.NASA_API_KEY



//landings

const fetchLandings = async () =>{
    const data = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
    console.log(data)
    const response = await data.json()
    console.log(response)
    return response   
}





//NEOs

const fetchNeas = async (from="2022-01-01", to="2022-01-07") => {
    const data = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${from}&end_date=${to}&api_key=kGUbR4WXdvFbZVozL3M5V3iCG5xsr6xxRVYGsbKB`)
    const response = await data.json()
    console.log(response)
    return response
}









const nasaAPI = {
    fetchLandings,
    fetchNeas,

}


module.exports = nasaAPI;
