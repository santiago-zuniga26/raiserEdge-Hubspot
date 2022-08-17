const { json } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const app = express()
const cors = require("cors");

const { getAuthorized } = require('./donations');

app.set('port', process.env.PORT || 3000);

app.use(cors());

app.use(express(json));

app.get("/api/v1/raiserEdge/", getAuthorized)

app.listen(app.get('port'), ()=>{
    console.log("Server running: ", app.get('port'));
});