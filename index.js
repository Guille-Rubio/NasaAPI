const express = require('express');
const morgan = require('./config/morganConfig');
const router = require('./routes/APIroutes');
require('dotenv').config();
require('./config/mongoConfig')

const app = express()
const port = 3000;

app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(port, () => { console.log(`listening on port ${port}`) })
