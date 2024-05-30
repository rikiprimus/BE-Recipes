const Pool = require("../config/db")

const getUserByIdModel = async (id) => {
	console.log("model - getUserByIdModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM users WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const findUser = async (email) => {
	console.log("model - getUserByEmail")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM users WHERE email='${email}';`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const createUser = async (data) => {
  console.log("model - createUser")
	let {id,name,phone,email,password,role,otp} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`INSERT INTO users (id, name, phone, email, password, role, otp, createdAt) VALUES ('${id}','${name}', '${phone}', '${email}', '${password}', '${role}', '${otp}', NOW());`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const changePassword = async (data) => {
	console.log("model - Change Password User")
	let {id, password} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE users SET updatedAt=NOW(), password='${password}' WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const changePasswordByEmail = async (data) => {
	console.log("model - Change Password User")
	let {email, password} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE users SET updatedAt=NOW(), password='${password}' WHERE email='${email}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const updatePinByEmail = async (data) => {
	console.log("model - updateUser")
	let {email, pin} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE users SET updatedAt=NOW(), pin='${pin}' WHERE email='${email}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const activatedUser = async(id) => {
	console.log("model - activatedUser")
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE users SET is_verif=true WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

module.exports = { createUser, getUserByIdModel, findUser, activatedUser, changePassword, changePasswordByEmail, updatePinByEmail }