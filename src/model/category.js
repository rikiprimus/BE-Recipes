const Pool = require("../config/db")

const getCategoryByIdModel = async (id) => {
	console.log("model - getCategoryByIdModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM category WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const getCategoryModel = async () => {
  console.log("model - getCategoryModel")
  return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM category`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const createCategory = async (data) => {
  console.log("model - createCategory")
	let {id,name,description} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`INSERT INTO category (id, name, description, created_at) VALUES ('${id}','${name}', '${description}', NOW());`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const updateCategory = async (data) => {
	console.log("model - updateCategory")
	let {id,name,description} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE category SET updated_at=NOW(), name='${name}', description='${description}' WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const deleteCategory = async (id) => {
	console.log("model - deleteCategory")
	return new Promise((resolve, reject)=>
		Pool.query(`DELETE FROM category WHERE id = '${id}'`, (err, res) => {
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db - `,err)
				reject(err)
			}
		})
	)
}

module.exports = { getCategoryModel, createCategory, deleteCategory, getCategoryByIdModel, updateCategory }