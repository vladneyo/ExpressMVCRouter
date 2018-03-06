const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Router = require('../ExpressMVCRouter/dist/router.js').Router;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Router());

app.listen(3000, () => console.log('Example app listening on port 3000!'));