const jwt = require("jsonwebtoken")

let key = process.env.JWT_KEY

const generateToken = (payload) => {
	const opVerify = {
		expiresIn : '1m'
	}
	const token = jwt.sign(payload, key, opVerify)
	return token
}

const refreshToken = (payload) => {
	const opVerify = {
		expiresIn : '1m'
	}
	const refreshToken = jwt.sign(payload, key, opVerify)
	return refreshToken
}

module.exports = {generateToken, refreshToken}