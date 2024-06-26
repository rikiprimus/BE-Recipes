const { v4: uuidv4 } = require("uuid")

const { 
    getUserByIdModel,
    getUsersModel,
    createUser,
    updateUser,
    deleteUser
} = require("../model/users")
const cloadinary = require("../config/cloadinary")

const UsersController = {
    getUsers: async (req, res, next) => {
        try {
            let users = await getUsersModel();
            let result = users.rows;
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getUser", data: result });
        } catch (err) {
            console.log("getUsers error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getUser Controller" });
        }
    },

    getUserById: async (req, res, next) => {
        try {
            let { id } = req.params;
            console.log(id)
            if (id === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let users = await getUserByIdModel(id);
            let result = users.rows;
            if (!result.length) {
                return res
                    .status(404)
                    .json({ message: "user not found or id invalid" });
            }
            console.log(result);
            return res
                .status(200)
                .json({ message: "success getUserById", data: result[0] });
        } catch (err) {
            console.log("getUserById error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed getUserById Controller" });
        }
        },

    InputUser: async (req, res, next) => {
        try {
            let { name, phone, email, password, photo_profile, bio } = req.body;
            if (
                !name ||
                name === "" ||
                !phone ||
                phone === "" ||
                !email || 
                email === "" || 
                !password || 
                password === "" 
            ) {
                return res.json({ code: 404, message: "input invalid" });
            }
            let data = { id: uuidv4(), name, phone, email, password, photo_profile, bio };
            let result = await createUser(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success input data" });
            }
            return res
                .status(401)
                .json({ code: 401, message: "failed input data" });
        } catch (err) {
            console.log("InputUser error");
            console.log(err.message);
            return res
                .status(404)
                .json(err.message);
        }
    },
    
    PutUser: async (req, res, next) => {
        try {
            const imageUrl = await cloadinary.uploader.upload(req.file.path,{folder:'my_folder_BE'})
            if(!imageUrl){
                return res.status(404).json({status:404, message:`input data image failed`})
            }
            let { id } = req.params;
            if (id === "") {
                return res.status(404).json({ message: "params id invalid" });
            }
            let { name, phone, email, password, bio } = req.body;
            
            let photo_profile = imageUrl.secure_url
            // Log incoming data for debugging
            console.log("Incoming data:", photo_profile);

            let users = await getUserByIdModel(id);
            let resultUser = users.rows;
            if (!resultUser.length) {
                return res
                    .status(404)
                    .json({ message: "user not found or id invalid" });
            }
            let user = resultUser[0];
            let data = {
                id,
                name: name || user.name,
                phone: phone || user.phone,
                email: email || user.email,
                password: password || user.password,
                photo_profile: photo_profile || user.photo_profile,
                bio: bio || user.bio,
            };
            // Log the final data that will be sent to updateUser
            console.log("Final data to update:", data);
            let result = await updateUser(data);
            if (result.rowCount === 1) {
                return res
                    .status(201)
                    .json({ code: 201, message: "success update data" });
            }
            return res.status(401).json({code:401,message:"failed update data"})
        } catch (err) {
            console.log("UpdateUser error");
            console.log(err);
            return res
                .status(404)
                .json({ message: "failed UpdateUser Controller" });
        }
    },

    DeleteUser: async(req, res, next) => {
        try {
            let id  = req.params.id;
            if (!id) {
                return res.status(404).json({ message: "params id invalid" });
            }
            
            let users = await getUserByIdModel(id);
            let resultUser = users.rows;
            if (!resultUser.length) {
                return res
                    .status(404)
                    .json({ message: "User not found" });
            }
            
            await deleteUser(id);
            return res
                    .status(200)
                    .json({ code: 200, message: "success delete data" });
        } catch (err) {
            console.log("DeleteUser error");
            console.log(err);
            return res
                .status(500)
                .json({ message: "failed DeleteUser Controller" });
        }
    },
    }

module.exports = UsersController