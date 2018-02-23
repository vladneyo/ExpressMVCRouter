const express = require('express');
const app = express();
const Router = require('../ExpressMVCRouter/dist/router.js').Router;

app.use(Router());

app.listen(3000, () => console.log('Example app listening on port 3000!'));