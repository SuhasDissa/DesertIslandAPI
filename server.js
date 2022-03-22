const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const {
    MongoClient, ObjectId
} = require('mongodb');

app.use(cors());
app.use(express.json());
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
    if (req.headers.collection) {
        collectionName = req.headers.collection;
        client.connect(err => {
            if (err) return console.log("Error: ", err);
            const collection = client.db("desertisland").collection(collectionName);
            collection.find({}).toArray(function(err, result) {
                if (err) {
                    res.status(400).send("Error fetching listings!");
                } else {
                    res.json(result);
                }
                client.close();
            });
        });
    } else {
        res.redirect("https://pirateisland.glitch.me");
    }
});
app.post('/', function(req, res) {
    newitem = req.body;
    if (req.headers.collection) {
        collectionName = req.headers.collection;
        client.connect(err => {
            if (err) return console.log("Error: ", err);
            const collection = client.db("desertisland").collection(collectionName);
            collection.insertOne(newitem, function(err, response) {
                if (err) {
                    res.status(400).send("Error Updating listings!");
                } else {
                    res.send('{"message":"post added"}');
                }
                client.close();

            });
        });
    } else {
        res.status(404).send("Error!");
    }
});
app.patch('/', function(req, res) {
    newitem = req.body;
    if (req.headers.collection) {
        collectionName = req.headers.collection;
        client.connect(err => {
            if (err) return console.log("Error: ", err);
            const collection = client.db("desertisland").collection(collectionName);

            collection.updateOne({ _id:new ObjectId(req.headers.id) },newitem, function(err, response) {

                if (err) {
                    res.status(400).send(err);
                } else {
                    res.send('{"message":"post added"}');
                }
                client.close();

            });
        });
    } else {
        res.status(404).send("Error!");
    }
});
