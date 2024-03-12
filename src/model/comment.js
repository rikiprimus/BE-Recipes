const Pool = require("../config/db")

const getCommentsByRecipeModel = async (recipes_id) => {
	console.log("model - getCommentsModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT recipe_comment.* FROM recipe_comment JOIN recipes ON recipe_comment.recipes_id = recipes.id WHERE recipes.id = '${recipes_id}';`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}
const getCommentByIdModel = async (id) => {
	console.log("model - getCommentByIdModel")
	return new Promise((resolve,reject)=>
		Pool.query(`SELECT * FROM recipe_comment WHERE id='${id}'`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const createComment = async (data) => {
	console.log("model - createComment")
	let {id,fill_comment,recipes_id,users_id} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`INSERT INTO recipe_comment (id, fill_comment, createdAt, recipes_id, users_id) VALUES ('${id}','${fill_comment}',NOW(),'${recipes_id}','${users_id}');`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const updateComment = async (data) => {
	console.log("model - updateComment")
	let {id, fill_comment} = data
	console.log(data)
	return new Promise((resolve,reject)=>
		Pool.query(`UPDATE recipe_comment SET updatedAt=NOW(), fill_comment='${fill_comment}' WHERE id='${id}';`,(err,res)=>{
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db -`,err)
				reject(err)
			}
		})
	)
}

const deleteComment = async (id) => {
	console.log("model - deleteComment")
	return new Promise((resolve, reject)=>
		Pool.query(`DELETE FROM recipe_comment WHERE id = '${id}'`, (err, res) => {
			if(!err){
				return resolve(res)
			} else {
				console.log(`error db - `,err)
				reject(err)
			}
		})
	)
}

module.exports = {getCommentsByRecipeModel,getCommentByIdModel,createComment,updateComment,deleteComment}