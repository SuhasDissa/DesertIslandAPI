const express = require("express");
const app = express();
const cors = require("cors");
const compression = require('compression');
const bodyParser = require('body-parser');
const {
    MongoClient
} = require('mongodb');

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
});

const client = new MongoClient(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.get('/', async function(req, res) {
    res.redirect("https://pirateisland.glitch.me");
});

app.get('/posts', async function(req, res) {
    client.connect(err => {
        if (err) return console.log("Error: ", err);
        const collection = client.db("desertisland").collection("posts");
        collection.find({}).toArray(function(err, result) {
            if (err) {
                res.status(400).send("Error fetching listings!");
            } else {
                res.json(result);
            }
            console.log(result);
            client.close();
        });
    });
});
app.post('/post', function(req, res) {
    var id = req.body.id;
    var thumb = req.body.thumb;
    var title = req.body.title;
    newitem = {
        id: id,
        thumb: thumb,
        title: title
    };
    client.connect(err => {
        if (err) return console.log("Error: ", err);
        const collection = client.db("desertisland").collection("posts");
        collection.insertOne(newitem, function(err, response) {
            if (err) {
                res.status(400).send("Error Updating listings!");
            } else {
                res.send('{"message":"post added"}');
            }
            client.close();

        });
    });
});