const express = require('express');
const userRouter = require('./routes/userRoutes');
const apiRouter = require('./routes/APIroutes');
require('dotenv').config();
require('./config/mongoConfig');
const { connectSQL } = require('./config/elephantSQLConfig');
require('body-parser');
const cors = require('cors');//Añadido para conectar front y back 
const path = require('path');//Añadido para conectar front y back 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors(
{
    origin: ["https://enigmatic-hamlet-54343.herokuapp.com/","https://melodious-speculoos-e31a9b.netlify.app/","https://api.nasa.gov/planetary/apod"],
    //methods:['GET','PUT', 'POST', 'DELETE'],
    allowedHeaders:['Content-Type'],
    //exposedHeaders: [],
    //credentials:true,
    //maxAge:18,
    //preflightContinue:true,
    //optionsSuccessStatus:
}
));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", apiRouter);
app.use("/", userRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'))
})

app.use((req, res, next) => {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

app.listen(port, () => { console.log(`listening on port ${port}`) })
