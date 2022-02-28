const express = require("express");
const app = express();
const cors = require("cors");
const compression = require('compression');
const bodyParser = require('body-parser');
const { MongoClient} = require('mongodb');

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
});

const client = new MongoClient(process.env.MONGO_URL, { useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true });
app.get('/', async function (req, res) {
    res.redirect("https://suhasdissa.github.io/DesertIsland");
});

app.get('/music', async function (req, res) {
    client.connect(err => {
        if (err) return console.log("Error: ", err);
        const collection = client.db("desertisland").collection("music");
        collection.find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});
app.post('/music', function (req, res) {
    var id = req.body.id;
    var thumb = req.body.thumb;
    var title = req.body.title;
    newitem = { id: id, thumb: thumb, title: title };
    client.connect(err => {
        if (err) return console.log("Error: ", err);
        const collection = client.db("desertisland").collection("music");
        collection.insertOne(newitem, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            client.close();

        });
    });
    return res.send('{"message":"song added"}');
});
