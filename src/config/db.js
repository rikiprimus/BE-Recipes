const {Pool} = require("pg")
// Mengatur konfigurasi dari file .env
require("dotenv").config()


// Membuat koneksi ke database
const pool = new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
})

module.exports = pool