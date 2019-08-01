/*
    Api for checkpoint endpoint
*/
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
const mongo = require('mongodb');
require("../database/mongo_db");



/*
ENDPOINT: Add New checkpoint
PARAMETERS:
-latitude
-longitude
-títle
-descripction
-photo
-travelId
RETURN:

*/
router.post('/', function (req, res, next) {
    const newCheckpoint = req.body;

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const payload = jwt.verify(token, "mysecret");

        global.dbo.collection("travels").findOne({ id: newCheckpoint.travelId },
            (error, result) => {
                if (error || !result) {
                    res.status(400).send("Travel not exists");
                    return next();
                }
                global.dbo.collection("checkpoint").insertOne({
                    latitude: newCheckpoint.latitude,
                    longitude: newCheckpoint.longitude,
                    title: newCheckpoint.title,
                    description: newCheckpoint.description,
                    photo: newCheckpoint.photo,
                    time: Date.now(),
                    travelId: newCheckpoint.travelId
                }, (error, result) => {
                    if (error) throw error;
                    res.send(result.ops[0]);
                });
            });

    } catch (_err) {
        console.log(_err);
        res.status(401).send("Invalid credentials");
    }
});

/* ENDPOINT:get check point to edit

*/

router.get('/:id', (req, res) => {
    const checkpointId = req.params.id;

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);

        const payload = jwt.verify(token, "mysecret");

        query = global.dbo.collection("checkpoint").find({ _id: mongo.ObjectId(checkpointId) });

        query.toArray().then(documents => {
            res.send(documents[0]);
        });

    } catch (err) {
        res.status(401).send("you don`t have permission");
    }

});

/* 
ENDPOINT:get check point for a given travel Id
PARAMETERS: Request parameter 
 - travelId
 
EXAMPLE:
http://localhost:3000/api/checkpoint?travelId=<travelId>

*/

router.get('/', (req, res) => {
    const travelIdFromParams = req.query.travelId;

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);

        const payload = jwt.verify(token, "mysecret");

        query = global.dbo.collection("checkpoint").find({ travelId: travelIdFromParams });

        query.toArray().then(documents => {
            res.send(documents);
        });

    } catch (err) {
        res.status(401).send("you don`t have permission");
    }

});

router.put("/:id", (req, res) => {
    const checkpointId = req.params.id;
    const data = req.body;

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const payload = jwt.verify(token, "mysecret");

        global.dbo.collection("checkpoint").updateOne({ _id: mongo.ObjectId(checkpointId) }, {
            $set:
            {
                latitude: data.latitude,
                longitude: data.longitude,
                title: data.title,
                description: data.description,
                photo: data.photo,
            }
        }, (error, result) => {
            if (error) throw error;
            res.status(200).send(result)
        });

    } catch (_err) {
        console.log(_err);
        res.status(500).send("Error during checkpoint update");
    }
});

/* END POINT: delete checkpoint
*/

router.delete("/:id", (req, res) => {
    const checkpointId = req.params.id;

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const payload = jwt.verify(token, "mysecret");

        global.dbo.collection("checkpoint").removeOne({ _id: mongo.ObjectId(checkpointId) },
            (error, result) => {
                if (error) throw error;
                res.status(200).send("Checkpoint deleted");
            });
    } catch (_err) {
        console.log(_err);
        res.status(500).send("Error deleting checkpoint");
    }
})



module.exports = router;