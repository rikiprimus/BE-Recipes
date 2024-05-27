const { v4: uuidv4 } = require("uuid");
const { findUser, createUser, activatedUser, getUserByIdModel, changePassword } = require("../model/auth");
const argon2 = require("argon2")
const {generateToken, refreshToken} = require("../helper/token");
const { sendEmailActivated, sendLink } = require("../helper/email");

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
            let id = uuidv4()
            let otp = uuidv4()
            let data = {
                id,
                name,
                phone,
                email,
                role,
                password: await argon2.hash(password),
                otp
            };

            let url = `https://recipefree.vercel.app/auth/activated/${id}/${otp}`

            let sendOTP = await sendEmailActivated(email,url,name)
            
            if(!sendOTP){
                return res
                .status(401)
                .json({ status: 401, messages: "register failed when send email" });
            }

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
        if (userData && userData.is_verif === false) {
            return res
                .status(401)
                .json({ status: 401, messages: "email not verified, please check your email to activated your account" });
        }
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
        res.cookie('token', token, { httpOnly: true });
        if(isVerifyPassword){
            userData.token = token,
            delete userData.password
            delete userData.createdat
            return res.status(200).json({status:200,message:`login berhasil`,data:userData, role })     
        } else if(!isVerifyPassword) {
            return res.status(401).json({ status: 401, messages: "password wrong" });
        }
		
		return res.status(201).json({ status: 201, messages: "login gagal",});
	},
    forgotpassword: async (req, res, next) => {
		let { email } = req.body;
        if (!email || email == "") {
            return res.status(401).json({ status: 401, messages: "email & password is required"});
        }
        let user = await findUser(email);
        if (user.rowCount === 0) {
            return res.status(401).json({ status: 401, messages: "email not register" });
        }
		let userData = user.rows[0]
        if (userData && userData.is_verif === false) {
            return res
                .status(401)
                .json({ status: 401, messages: "email not verified, please check your email to activated your account" });
        }
        let url = `https://fe-recipe-rho.vercel.app/change-password/${userData.id}`

        let sendLinkDirect = await sendLink(email,url)

        if(!sendLinkDirect){
            return res
            .status(401)
            .json({ status: 401, messages: "forgot password failed when send email" });
        }
        return res.status(201).json({ status: 201, messages: "forgot password success please change your password" });
	},
    changepassword: async (req, res, next) => {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(400).json({ status: 400, message: "id & password are required" });
        }

        let user = await getUserByIdModel(id);

        if (user.rowCount === 0) {
            return res.status(401).json({ status: 401, messages: "email not register" });
        }
		let userData = user.rows[0]
        if (userData && userData.is_verif === false) {
            return res
                .status(401)
                .json({ status: 401, messages: "email not verified, please check your email to activated your account" });
        }
        const hashedPassword = await argon2.hash(password)
        const data = {
            id: id,
            password: hashedPassword
        }
        let result = await changePassword(data);

        if(!result) {
            return res.status(401).json({ status: 401, messages: "failed change password" });
        }

        return res.status(201).json({ status: 201, messages: "change password success please login", data: [id, userData, password] });
	},
    verification: async (req, res, next) => {
        let { id, otp } = req.params;

        let user = await getUserByIdModel(id);
        if (user.rowCount === 0) {
            return res
                .status(404)
                .json({ status: 404, messages: "email not register" });
        }
        let userData = user.rows[0];

        if (otp !== userData.otp) {
            return res
                .status(404)
                .json({ status: 404, messages: "otp invalid" });
        }

        let activated = await activatedUser(id);

        if (!activated) {
            return res
                .status(404)
                .json({ status: 404, messages: "account failed verification" });
        }

        return res
            .status(201)
            .json({ status: 201, messages: "account success verification" });
    },
};

module.exports = AuthController;
