/*
    Api for users endpoint
*/
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
var md5 = require('md5');
const mongo = require('mongodb');
require("../database/mongo_db");

/*
ENDPOINT: User Login 
PARAMETERS:
 - email
 - password
RETURN:
 - OK: 200
 - INCORRECT PASSWORD FORMAT: 400
 - INVALID CREDENTIALS: 401

*/
router.post('/login', function (req, res) {

    // Password validations
    if (req.body.password.length < 5) {
        res.status(400).send("ERROR: Password Invalid format");
    } else {

        const query = global.dbo.collection("users").find({
            email: req.body.email,
            password: md5(req.body.password)
        });

        query.toArray().then(documents => {
            if (documents.length > 0) {
                var token = jwt.sign(
                    {
                        _id: documents[0]._id,
                        username: documents[0].username,
                        email: documents[0].email,
                        admin: documents[0].admin ? true : false

                    },
                    "mysecret",
                    {
                        expiresIn: 3600
                    }
                ); console.log(token)
                res.status(200).send(token);
            } else {
                res.status(401).send("Invalid credentials");
            }
        });
    }
});
/*
ENDPOINT: Add New User
PARAMETERS:
 - Username
 - email
 - password
 RETURN:
 - OK: 200
 - USER ALREDY EXISTS:400
 - INCORRECT PASSWORD FORMAT: 400?(FALTA POR INCLUIR)

*/

router.post('/', function (req, res) {
    const newUser = req.body;

    try {
        const query = global.dbo.collection("users").find({
            email: req.body.email,

        });
        query.toArray().then(documents => {
            if (documents.length > 0) {
                res.status(400).send("User alredy exists");

            } else {
                global.dbo.collection("users").insertOne({
                    username: newUser.username,
                    password: md5(newUser.password),
                    admin: false,
                    email: newUser.email

                }, (error, result) => {
                    if (error) throw error;
                    var token = jwt.sign(
                        {
                            _id: result.insertedId,
                            username: newUser.username,
                            email: newUser.email,
                            admin: newUser.admin ? true : false

                        },
                        "mysecret",
                        {
                            expiresIn: 3600
                        }
                    ); console.log(token)
                    res.send(token);
                });
            }
        });
    } catch (_err) {
        console.log(_err);
        res.status(401).send("an error has occurred");
    }
});

/*
ENDPOINT: Edit User
HEADERS: Token
PARAMETERS:
 - user Id
 - email
 - username
RETURN:
 - OK: 200
 - ...
*/
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);

    try {
        const payload = jwt.verify(token, "mysecret");

        query = global.dbo.collection("users").find({ _id: mongo.ObjectId(userId) });

        query.toArray().then(documents => {
            res.send(documents[0]);
        });

    } catch (err) {
        res.status(401).send("you don`t have permission");
    }

});

router.put("/users/:id", (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const userId = req.params.id;
    const data = req.body;

    try {
        global.dbo.collection("users").updateOne({ _id: mongo.ObjectId(userId) }, {
            $set:
            {
                    username: data.username,
                    password: md5(data.password),
                    admin: false,
                    email: data.email
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





/*
ENDPOINT: Remove User
HEADERS: Token
PARAMETERS:
 - user Id
RETURN:
 - OK: 200
 - ...
*/

router.delete("/users/:id", (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const userId = req.params.id;

    try {
        const payload = jwt.verify(token, "mysecret");

        global.dbo.collection("users").removeOne({ _id: mongo.ObjectId(userId) },
            (error, result) => {
                if (error) throw error;
                res.send("deleted")
            });
    } catch (_err) {
        console.log(_err);
        res.status(401).send(" you don't have permission to delete");
    }


})

/*
ENDPOINT: Change User password
HEADERS: Token
PARAMETERS:
 - user Id
 - old Password
 - new Password
RETURN:
 - OK: 200
 - ...
*/

module.exports = router;