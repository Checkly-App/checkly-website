const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const cors = require('cors')({ origin: 'https://checkly-292d2.web.app' });
const serviceAccount = require('./AccountKey.json');
const admin = require('firebase-admin');

require('dotenv').config()

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://checkly-292d2-default-rtdb.firebaseio.com"
});

exports.sendEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const email = req.body.data.email;
        const name = req.body.data.name;
        const password = req.body.data.password;

        const msg = {
            to: email,
            from: 'checkly.services@gmail.com',
            templateId: 'd-bdb551d3829d4735908b055a7284c134',
            dynamicTemplateData: {
                name: name,
                password: password,
                email: email
            },
        };
        sgMail.send(msg).then(() => {
            return res.status(200).send({
                data: {
                    status: 200,
                    message: 'sent',
                },
            });
        }, error => {
            console.error(error);
            if (error.res) {
                return res.status(500).send({
                    data: {
                        status: 500,
                        message: error.toString(),
                    },
                });
            }
        });
    });
});

// Function: Update existing employee's email 
exports.updateUserEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const email = req.body.data.email;
        const uid = req.body.data.uid;

        return admin.auth().updateUser(uid, {
            email: email
        }).then((userRecord) => {
            console.log('Successfully updated user', userRecord.toJSON());
        }).catch((error) => {
            console.log('Error updating user:', error);
        });
    });
});

// Function: Delete an employee  
exports.DeleteEmployee = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const uid = req.body.data.uid;

        admin.auth().deleteUser(uid)
        let usersRef = admin.database().ref("Employee");
        usersRef.child(uid).update({
            deleted: 'true'
        })
            .then(function () {
                res.send({ status: 'ok' });
            })
            .catch(function (error) {
                console.log('Error deleting data:', error);
                res.send({ status: 'error', error: error });


            });
    });

});