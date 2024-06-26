const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
    },
});


async function sendMail(mailOption){
	try{
		const data = await transporter.sendMail(mailOption)
		console.log("email sent : ",data.response ?? data)
		return data.response
	} catch(err){
		console.log("email error : ", err.message ?? err)
		return false
	}
}

const sendEmailActivated = async (email_user, url, name) => {
	const mailOption = {
		from: process.env.EMAIL_NAME,
		to: email_user,
		subject: `Hello ${name}, Please Verification for Recipe Test App`,
		text: `Hello ${name}, Please Verification for Recipe Test App, this is your activated link ${url}`
	}
	return await sendMail(mailOption)
}

const sendLink = async (email_user, url) => {
	const mailOption = {
		from: process.env.EMAIL_NAME,
		to: email_user,
		subject: `Change your password using the link below`,
		text: `Link Forgot Password : ${url}`
	}
	return await sendMail(mailOption)
}

const sendPin = async (email_user, pin) => {
	const mailOption = {
		from: process.env.EMAIL_NAME,
		to: email_user,
		subject: `Change your password using code PIN below`,
		text: `YOUR CODE PIN : ${pin}`
	}
	return await sendMail(mailOption)
}

module.exports = {sendEmailActivated, sendLink, sendPin}