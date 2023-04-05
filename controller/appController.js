const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

const { EMAIL, PASS} = process.env;

// send an email using REAL GMAIL account
const formNotif = (req, res) => {
    const {userEmail} = req.body;

    let config = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        debug: true,
        auth: {
            type: "login", // default
            user: EMAIL,
            pass: PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    }

    let transporter = nodemailer.createTransport(config)

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "FormanaDev",
            link: 'https://fakelink.js/'
        }
    })

    let response = {
        body: {
            name: "Red Spartan",
            intro: "New form!",
            table: {
                data: [
                    {
                        link:  'https://fakeformlink',
                        description: "For CS and IT students",
                        date: "date"
                    }
                ]
            },
            outro: "outro message"
        }
    }
    let mail = MailGenerator.generate(response)

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "New Form",
        html: mail
    }


    
    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "Check your Gmail.."
        })
    }).catch(error => {
        console.log(error);
        return res.status(500).json({error})
    })



    // res.status(201).json("New Form!");
}



module.exports = {
    formNotif
}