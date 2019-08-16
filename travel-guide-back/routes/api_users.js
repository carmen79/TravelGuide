/*
    Api for users endpoint
*/
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
var md5 = require('md5');
const mongo = require('mongodb');
require("../database/mongo_db");
const multer = require('multer');

var storage = multer.diskStorage(
    {
        destination: 'public/avatar/',
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }
);
var upload = multer({ storage: storage })

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

                );
                console.log(token)
                var myResponse = { token: token, user: documents[0] };
                res.status(200).send(myResponse);
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
        let query = global.dbo.collection("users").find({
            email: req.body.email,

        });
        query.toArray().then(documents => {
            if (documents.length > 0) {
                res.status(400).send("User alredy exists");

            } else if (newUser.password.length < 5) {
                res.status(400).send("Incorrect password format");
            } else {
                global.dbo.collection("users").insertOne({
                    username: newUser.username,
                    password: md5(newUser.password),
                    admin: false,
                    email: newUser.email,
                    description: newUser.description,
                    time: Date.now()
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

                    );

                    console.log(token)

                    query = global.dbo.collection("users").find({ _id: mongo.ObjectId(result.insertedId) });
                    query.toArray().then(documents => {
                        var myResponse = { token: token, user: documents[0] };
                        res.status(200).send(myResponse);

                    });
                });
            }
        });
    } catch (_err) {
        console.log(_err);
        res.status(401).send("an error has occurred");
    }
});

/*
ENDPOINT: Get User
HEADERS: Token
PARAMETERS:
 - user Id
RETURN:
 - OK: 200
 - FAIL: 401
*/
router.get('/:id', (req, res) => {
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

/*
ENDPOINT: Edit User
HEADERS: Token
PARAMETERS:
 - user Id
 - email
 - username
RETURN:
 - OK: 200
 - FAIL: 401
*/
router.put("/:id", (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const userId = req.params.id;
    const data = req.body;

    try {
        const payload = jwt.verify(token, "mysecret");
        global.dbo.collection("users").updateOne({ _id: mongo.ObjectId(userId) }, {
            $set:
            {
                username: data.username,
                email: data.email,
                description: data.description

            }
        }, (error, result) => {
            if (error) throw error;

            let query = global.dbo.collection("users").find({ _id: mongo.ObjectId(userId) });
            query.toArray().then(documents => {
                res.status(200).send(documents[0]);
            });
        });

    } catch (_err) {
        console.log(_err);
        res.status(500).send("Error during user update");
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
router.delete("/:id", (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const userId = req.params.id;

    try {
        const payload = jwt.verify(token, "mysecret");

        global.dbo.collection("users").removeOne({ _id: mongo.ObjectId(userId) },
            (error, result) => {
                if (error) throw error;
                res.status(200).send("User deleted");
            });
    } catch (_err) {
        console.log(_err);
        res.status(500).send("Error deleting user");
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
router.put("/password/:id", (req, res, next) => {
    const userId = req.params.id;
    const data = req.body;

    try {
        if (!req.headers.authorization) {
            res.status(401).send("Unauthorized");
            return next();
        }
        const token = req.headers.authorization.replace("Bearer ", "");
        const payload = jwt.verify(token, "mysecret");

        // Check old password is correct
        query = global.dbo.collection("users").find({ _id: mongo.ObjectId(userId) });
        query.toArray().then(documents => {
            if (documents.length === 0) {
                res.status(400).send("User not exists");
                return next();
            }
            // User exists. Check fields
            const userDataBase = documents[0];

            // The old password must be correct
            if (userDataBase.password !== md5(data.oldPassword)) {
                res.status(400).send("Old Password is incorrect");
                return next();
            }

            // Password must be at least 5 characters
            if (data.newPassword.length < 5) {
                res.status(400).send("New Password invalid format");
                return next();
            }

            global.dbo.collection("users").updateOne({ _id: mongo.ObjectId(userId) }, {
                $set:
                {
                    password: md5(data.newPassword)
                }
            }, (error, result) => {
                if (error) throw error;
                res.status(200).send("Pasword changed correctly");
            });
        });
    } catch (_err) {
        console.log(_err);
        res.status(500).send("Error during the operation");
    }
});
/*
ENDPOINT: ADD PHOTO
*/
router.post('/avatar/:id', upload.single('avatar'), (req, res, next) => {
    const userId = req.params.id;
    const file = req.file;
    if (!file) {
        res.status(400).send("Incorrect file");
        return next();
    }
    console.log("Ruta de la imagen para guardar en BBDD: " + file.filename);

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const payload = jwt.verify(token, "mysecret");
        global.dbo.collection("users").updateOne({ _id: mongo.ObjectId(userId) }, {
            $set:
            {
                avatar: file.filename
            }
        }, (error, result) => {
            if (error) throw error;
            query = global.dbo.collection("users").find({ _id: mongo.ObjectId(userId) });
            query.toArray().then(documents => {
                res.status(200).send(documents[0]);
            });
        });

    } catch (_err) {
        console.log(_err);
        res.status(500).send("Error during user update");
    }
})

module.exports = router;