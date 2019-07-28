/*
    Api for travels endpoint
*/
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
var md5 = require('md5');
const mongo = require('mongodb');
require("../database/mongo_db");

/*
    GET endpoint: Return a list of travels stored in database
*/
router.get('/', (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);

    try {
        const payload = jwt.verify(token, "mysecret");

        query = global.dbo.collection("travels").find({ userId: payload._id }, {});
        // este userId será el id del usuario que lo tengo que guardar en la 
        //bbdd de Travel
        query.toArray().then(documents => {
            res.send(documents);
            // este document se refiere a un registro de la bbdd que en mongo son document
        });
    } catch (e) {
        res.status(401).send("You don't have permission");
    }

});

router.get('/:id', (req, res) => {
    const travelsId = req.params.id;
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);

    try {
        const payload = jwt.verify(token, "mysecret");

        query = global.dbo.collection("travels").find({ _id: mongo.ObjectId(travelsId) });

        query.toArray().then(documents => {
            res.send(documents[0]);
        });

    } catch (err) {
        res.status(401).send("you don`t have permission");
    }

});


router.post('/', function (req, res) {
    const newtravel = req.body;
    const token = req.headers.authorization.replace("Bearer ", "");


    try {
        const payload = jwt.verify(token, "mysecret");
        global.dbo.collection("travels").insertOne({
            destino: newtravel.destino,
            fechaInicio: newtravel.fechaInicio,
            fechaFin: newtravel.fechaFin,
            descripcion: newtravel.descripcion,
            userId: payload._id
        }, (error, result) => {
            if (error) throw error;
            res.send(result.ops[0]);
        });
    } catch (_err) {
        console.log(_err);
        res.status(401).send("an error has occurd");
    }
});

router.put("/:id", (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const travelsId = req.params.id;
    const data = req.body;

    try {
        global.dbo.collection("travels").updateOne({ _id: mongo.ObjectId(travelsId) }, {
            $set:
            {
                destino: data.destino,
                fechaInicio: data.fechaInicio,
                fechaFin: data.fechaFin,
                descripcion: data.descripcion
            }
        }, (error, result) => {
            if (error) throw error;
            res.send(result)
        });

    } catch (_err) {
        console.log(_err);
        res.status(401).send(" you don't have permission to edit");
    }
});

router.delete("/:id", (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const travelId = req.params.id;

    try {
        const payload = jwt.verify(token, "mysecret");

        global.dbo.collection("travels").removeOne({ _id: mongo.ObjectId(travelId) },
            (error, result) => {
                if (error) throw error;
                res.send("deleted")
            });
    } catch (_err) {
        console.log(_err);
        res.status(401).send(" you don't have permission to delete");
    }


})
module.exports = router;