/**  User email sent to my email address. 
 Meaning Nodemailer takes all the form details(The user message and email) and sends them to my email address for me to review, once I have the user's details, the user receives a confirmation dialog that their email has been successfully sent.
  Later after I have reviewed the email, the user will get a confirmation / follow - up email in their inbox.Which will be sent via my email.
*/

const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
require("dotenv").config();


// const tp = nodemailer.createTransport({
//     host: "smtp.forwardemail.net",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//     }
// })


router.post("/post", async (req, res) => {
    const potentialClient = new User({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })

    try {
        const newClient = await potentialClient.save();
        // tp.sendMail({
        //     from: "tumishomapangaofficial@gmail.com",
        //     to: req.body.email,
        //     subject: `Email confirmation for ${req.body.name}`,
        //     text: `Hello, ${req.body.name}, I have received your email, and I look forward to hearing about your project in detail. I am excited to work with you.`
        // })
        res.status(200).json({
            message: "Form Processed Successfully, and email sent successfully",
            newClient
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


router.get("/:id", async (req, res) => {
    try {
        const user = await User.find({
            _id: req.params.id
        });
        res.json(user)
    } catch (err) {
        res.status(404).json({
            message: `User ${req.params.id} could not be found.`
        })
    }

})



router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({
            _id: req.params.id
        });

        res.json({
            user,
            message: "User deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

module.exports = router