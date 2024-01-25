const express = require('express');
const app = express();
const dotenv = require("dotenv")

dotenv.config();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/email', (req, res) => {
    console.log(process.env.EMAIL)
    console.log(process.env.PASSWORD)
    const { fullName, email, comments } = req.body;

    const content = {
        fullName: fullName,
        email: email,
        comments: comments
    };
    console.log(content);
    try {
        sendVerificationEmail(content);
        console.log("Successfully sending Message");
        res.status(200).json("Successfully sending Message");
    } catch (error) {
        console.log(error);
        res.status(500).json("An error occurred while sending Message. Try again");
    }
});
console.log(process.env.EMAIL)
const sendVerificationEmail = async (content) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: "Your Portfolio",
        to: "emirhankorkmaz275@gmail.com",
        subject: "New Message",
        text: `Message Details:\nFull Name: ${content.fullName}\nEmail: ${content.email}\nComments: ${content.comments}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending email", error);
    }
};

app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});


