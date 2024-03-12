const jwt = require("jsonwebtoken")

let key = process.env.JWT_KEY

const generateToken = (payload) => {
	const opVerify = {
		expiresIn : '3h'
	}
	const token = jwt.sign(payload, key, opVerify)
	return token
}

const refreshToken = (payload) => {
	const opVerify = {
		expiresIn : '3h'
	}
	const refreshToken = jwt.sign(payload, key, opVerify)
	return refreshToken
}

module.exports = {generateToken, refreshToken}