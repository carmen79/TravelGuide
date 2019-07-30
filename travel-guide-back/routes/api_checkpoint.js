/*
    Api for checkpoint endpoint
*/
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
var md5 = require('md5');
const mongo = require('mongodb');
require("../database/mongo_db");



/*
ENDPOINT: Add New checkpoint
PARAMETERS:
-latitud
-longitud
-título
-descripción
-travel_id
RETURN:

*/
router.post('/', function (req, res) {
    const newCheckpoint = req.body;
    const token = req.headers.authorization.replace("Bearer ", "");

    try {
        const payload = jwt.verify(token, "mysecret");
        global.dbo.collection("checkpoint").insertOne({
            latitud: newCheckpoint.latitud,
            longitud: newCheckpoint.longitud,
            titulo: newCheckpoint.titulo,
            descripcion: newCheckpoint.descripcion

            
        }, (error, result) => {
            if (error) throw error;
            res.send(result.ops[0]);
        });
    } catch (_err) {
        console.log(_err);
        res.status(401).send("an error has occurd");
    }
});

 



module.exports = router;