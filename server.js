const express = require("express");
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
});

app.get('/', async function(req, res) {
    res.redirect("https://suhasdissa.github.io/DesertIsland");
});

app.get('/music', async function(req, res) {
    res.type('application/json');
    res.sendFile(process.cwd() +"/popularsongs.json");
});

/*
app.get('/', async function(req, res) {
    let name = req.query.name;
    if(name){

    res.send(name);

    }else{
      res.status(404).send('Not Found');
    }
});*/
