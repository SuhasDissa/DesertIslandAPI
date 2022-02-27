const express = require("express");
const app = express();
const cors = require("cors");
const compression = require('compression');
const bodyParser = require('body-parser');
var fs = require("fs");

app.use(cors());
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
    res.sendFile(process.cwd() +"/popularsongs.json",{status: 'good'});
});
app.post('/music', function (req, res) {
    var id = req.body.id;
    var thumb = req.body.thumb;
    var title = req.body.title;
    var obj = require("./popularsongs.json");

    var vaild = true;
    obj.items.forEach(item => {
        if(item.id == id){
            valid = false;
        }
    });
    if(valid){
    newitem = {id: id, thumb:thumb, title:title};
    obj.items.push(newitem);
    string = JSON.stringify(obj);
    fs.writeFile('./popularsongs.json', string, function (err) {if (err) return console.log(err);});
    return res.send('{"message":"song added"}');
    } else{
        return res.send('{"message":"song already in list"}');
    }
});
