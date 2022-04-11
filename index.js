const express = require('express');
const morgan = require('morgan');
const router = require('./routes/APIroutes');
require('dotenv');

const app = express()
const port = 3000;

morgan.token('host', function (req, res) {
  return req.hostname;
});
morgan.token('body', function (req, res) {
  return [
    JSON.stringify(req.body)
  ]
})

app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

morgan.token('param', function (req, res, param) {
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);


app.listen(port, () => { console.log(`listening on port ${port}`) })
