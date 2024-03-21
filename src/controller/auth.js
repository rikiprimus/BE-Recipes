const { v4: uuidv4 } = require("uuid");
const { findUser, createUser } = require("../model/auth");
const argon2 = require("argon2")
const {generateToken, refreshToken} = require("../helper/token");

const AuthController = {
    register: async (req, res, next) => {
        try {
            let { name, phone, email, password } = req.body;
            let role = req.params.role || "user"
            if (role !== "user" && role !== "admin") {
                return res.status(404). json({status:404,message:`role must be admin/user`})
            }
            if (!name || name == "" || 
                !phone || phone == "" || 
                !email || email == "" || 
                !password || password == ""
                ) {
                return res
                    .status(401).json({status: 401, messages: "email & password is required"});
            }
            // let {rows:[user]} = await findUser(email)

            let data = {
                id: uuidv4(),
                name,
                phone,
                email,
                role,
                password: await argon2.hash(password),
            };

            let result = await createUser(data)
            if(!result){
                return res.status(401).json({status:401, messages: 'register gagal'})
            }

            return res.status(201).json({ status: 201, messages: "register success please login" });
        } catch (error) {
            console.log("Register error");
            console.log(error);
            if(error.code === '23505' && error.constraint === 'users_email_key') {
                return res.status(404).json({ message: "email already register" });
            }
            return res.status(404).json({ message: "failed Register Controller" });
        }
    },
    login: async (req, res, next) => {
		let { email, password } = req.body;
        if (!email || !password || email == "" || password == "") {
            return res.status(401).json({ status: 401, messages: "email & password is required"});
        }
        let user = await findUser(email);
        if (user.rowCount === 0) {
            return res.status(401).json({ status: 401, messages: "email not register" });
        }
		let userData = user.rows[0]
        let role
        if (userData.role){
            if(userData.role == "admin") {
                role = "You are admin"
            } else if (userData.role == "user") {
                role = "You are user"
            } else if (!userData.role) {
                role = "You're role not valid !"
            }
        }
		
		let isVerifyPassword = await argon2.verify(userData.password,password)
		let token = generateToken(userData)
        let newToken = refreshToken(userData)
        res.cookie('token', token, { httpOnly: true });
        if(isVerifyPassword){
            userData.token = token,
            userData.token = newToken,
            delete userData.password
            delete userData.createdat
            return res.status(200).json({status:200,message:`login berhasil`,data:userData, newToken, role })     
        } else if(!isVerifyPassword) {
            return res.status(401).json({ status: 401, messages: "password wrong" });
        }
		
		return res.status(201).json({ status: 201, messages: "login gagal",});
	},
};

module.exports = AuthController;
