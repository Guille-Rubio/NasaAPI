const express = require('express');
const userRouter = require('./routes/userRoutes');
const apiRouter = require('./routes/apiRoutes');
require('dotenv').config();
require('./config/mongoConfig');
const { connectSQL } = require('./config/elephantSQLConfig');
require('body-parser');
const cors = require('cors');//Añadido para conectar front y back 
const path = require('path');//Añadido para conectar front y back 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

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
