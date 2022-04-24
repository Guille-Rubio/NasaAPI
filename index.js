const express = require('express');
const router = require('./routes/APIroutes');
require('dotenv').config();
require('./config/mongoConfig')
require('body-parser');

const app = express()
const port = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use((req, res, next) => {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

app.listen(port, () => { console.log(`listening on port ${port}`) })
