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
	let {id,name,phone,email,password,role} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`INSERT INTO users (id, name, phone, email, password, role, createdAt) VALUES ('${id}','${name}', '${phone}', '${email}', '${password}', '${role}', NOW());`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}


module.exports = { createUser, getUserByIdModel, findUser }









// const getUsersModel = async () => {
//   console.log("model - getUsersModel")
//   return new Promise((resolve,reject)=>
// 		Pool.query(`SELECT * FROM users`,(err,res)=>{
// 			if(!err){
// 				return resolve(res)
// 			} else {
// 				console.log(`error db -`,err)
// 				reject(err)
// 			}
// 		})
// 	)
// }

// const updateUser = async (data) => {
// 	console.log("model - updateUser")
// 	let {id,name,phone,email,password} = data
// 	console.log(data)
// 	return new Promise((resolve,reject)=>
// 		Pool.query(`UPDATE users SET updatedAt=NOW(), name='${name}', phone='${phone}', email='${email}', password='${password}' WHERE id='${id}'`,(err,res)=>{
// 			if(!err){
// 				return resolve(res)
// 			} else {
// 				console.log(`error db -`,err)
// 				reject(err)
// 			}
// 		})
// 	)
// }

// const deleteUser = async (id) => {
// 	console.log("model - deleteUser")
// 	return new Promise((resolve, reject)=>
// 		Pool.query(`DELETE FROM users WHERE id = '${id}'`, (err, res) => {
// 			if(!err){
// 				return resolve(res)
// 			} else {
// 				console.log(`error db - `,err)
// 				reject(err)
// 			}
// 		})
// 	)
// }
