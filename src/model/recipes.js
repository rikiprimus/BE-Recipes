const { search } = require("../config/cloadinary")
const Pool = require("../config/db")

const getRecipeDetailModel = async (data) => {
	let {searchBy,search,sortBy,sort,limit,offset} = data
	console.log("model - getRecipeDetailModel")
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT recipes.*, users.name, users.photo_profile FROM recipes
		JOIN users ON recipes.users_id = users.id WHERE ${searchBy} ILIKE '%${search}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const getRecipeDetailCountModel = async (data) => {
	let {searchBy,search} = data
	console.log("model - getRecipeDetailCountModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT recipes.*, users.name, users.photo_profile FROM recipes
		JOIN users ON recipes.users_id = users.id WHERE ${searchBy} ILIKE '%${search}%'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const getRecipesModel = async (data) => {
	let {searchBy, search, sortBy, sort, limit, offset} = data
	console.log("model - getRecipesModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT recipes.*, users.name, users.photo_profile FROM recipes
		JOIN users ON recipes.users_id = users.id 
		WHERE ${searchBy} ILIKE '%${search}%' 
		ORDER BY ${sortBy} ${sort} 
		LIMIT ${limit} OFFSET ${offset}`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const getRecipeByIdModel = async (id) => {
	console.log("model - getRecipeByIdModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT recipes.*, users.name, users.photo_profile FROM recipes JOIN users ON recipes.users_id = users.id WHERE recipes.id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const getRecipeByUsersIdModel = async (data) => {
	let { users_id, searchBy, search, sortBy, sort, limit, offset } = data
	console.log("model - getRecipeByIdModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT recipes.*, users.name, users.photo_profile FROM recipes 
		JOIN users ON recipes.users_id = users.id WHERE recipes.users_id='${users_id} 
		AND ${searchBy} ILIKE '%${search}%' 
		ORDER BY ${sortBy} ${sort} 
		LIMIT ${limit} OFFSET ${offset}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const createRecipe = async (data) => {
	console.log("model - createRecipe")
	let {id,title,ingredient,photo,video,users_id,category_id} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`INSERT INTO recipes (id,title,ingredient,photo,video,users_id,category_id,createdAt) VALUES ('${id}','${title}','${ingredient}','${photo}','${video}','${users_id}','${category_id}',NOW());`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const updateRecipe = async (data) => {
	console.log("model - updateRecipe")
	let {id,title,ingredient,photo,video,category_id} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE recipes SET updatedAt=NOW(), title='${title}', ingredient='${ingredient}', photo='${photo}', video='${video}', category_id='${category_id}' WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const deleteRecipe = async (id) => {
	console.log("model - deleteRecipe")
	return new Promise((resolve, reject)=>
		Pool.query(`DELETE FROM recipes WHERE id = '${id}'`, (err, res) => {
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db - `,err)
				reject(err)
			}
		})
	)
}

module.exports = {getRecipesModel,getRecipeByIdModel,createRecipe,updateRecipe,deleteRecipe,getRecipeDetailModel,getRecipeDetailCountModel, getRecipeByUsersIdModel}