const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: 'http://localhost:3000' });
const serviceAccount = require('./AccountKey.json');

require('dotenv').config();

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://checkly-292d2-default-rtdb.firebaseio.com"
});

// Function: Send email to new employee(s)
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

// Function: Delete an employee email 
