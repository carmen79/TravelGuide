/*
    Api for diary endpoint
*/
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
const mongo = require('mongodb');
require("../database/mongo_db");



/*
ENDPOINT: Add New diary
PARAMETERS:
-Number of day
-Place of interest
-Photo
-Summary/comment
-TravelId

RETURN:

*/
router.post('/', function (req, res, next) {
    const newDiary = req.body;

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const payload = jwt.verify(token, "mysecret");

        global.dbo.collection("travels").findOne({ _id: mongo.ObjectId(newDiary.travelId) },
            (error, result) => {
                if (error || !result) {
                    res.status(400).send("Travel not exists");
                    return next();
                }
                global.dbo.collection("diary").insertOne({
                    numberOfDay: newDiary.numberOfDay,
                    place: newDiary.place,
                    summary: newDiary.summary,
                    photo: newDiary.photo,
                    travelId: newDiary.travelId
                  
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

/* ENDPOINT:get diary to edit

*/

router.get('/:id', (req, res) => {
    const diaryId = req.params.id;

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);

        const payload = jwt.verify(token, "mysecret");

        query = global.dbo.collection("diary").find({ _id: mongo.ObjectId(diaryId) });

        query.toArray().then(documents => {
            res.send(documents[0]);
        });

    } catch (err) {
        res.status(401).send("you don`t have permission");
    }

});

/* ENDPOINT to edit diary
*/

router.put("/:id", (req, res) => {
    const diaryId = req.params.id;
    const data = req.body;

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const payload = jwt.verify(token, "mysecret");

        global.dbo.collection("diary").updateOne({ _id: mongo.ObjectId(diaryId) }, {
            $set:
            {
                    numberOfDay: data.numberOfDay,
                    place: data.place,
                    summary: data.summary,
                    photo: data.photo,
                    travelId: data.travelId
            }
        }, (error, result) => {
            if (error) throw error;
            res.status(200).send(result)
        });

    } catch (_err) {
        console.log(_err);
        res.status(500).send("Error during diary update");
    }
});

/* END POINT: delete diary
*/

router.delete("/:id", (req, res) => {
    const diaryId = req.params.id;

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const payload = jwt.verify(token, "mysecret");

        global.dbo.collection("diary").removeOne({ _id: mongo.ObjectId(diaryId) },
            (error, result) => {
                if (error) throw error;
                res.status(200).send("diary deleted");
            });
    } catch (_err) {
        console.log(_err);
        res.status(500).send("Error deleting diary");
    }
})



module.exports = router;