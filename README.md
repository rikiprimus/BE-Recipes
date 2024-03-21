# Project Food-Recipes-Backend with ExpressJs

Proyek Food-Recipes-Backend adalah API yang dibangun menggunakan framework Express.js untuk mengelola data users, recipes dan category pada sebuah aplikasi. API ini menyediakan berbagai fitur utama termasuk operasi CRUD, pengurutan, pencarian, dan pagination untuk mengelola data dengan efisien. Proyek ini juga menggunakan manajemen variabel lingkungan (env) dan disertai dengan koleksi Postman untuk pengujian API dan untuk database yang digunakan adalah PostgreSQL.

The Food-Recipes-Backend project is an API built using the Express.js framework to manage users, recipes, and categories data in an application. This API provides various key features including CRUD (Create, Read, Update, Delete) operations, sorting, searching, and pagination to efficiently manage data. The project also utilizes environment variable management (env) and comes with a Postman collection for API testing. PostgreSQL is used as the database for this project.

![image](https://github.com/rikiprimus/BE-Recipes/assets/34765525/16ea1112-e4ad-459f-9b58-05a82a35df6c)


## Tools
1. Visual Studio Code
2. NodeJS
3. ExpressJS
4. PostgreSQL for database (this is what i use)
5. Multer and Cloadinary for photo
6. Postman for testing API

## Instalasi dan Penggunaan:
1. **Clone Repository**: Clone this repository to your local system.
```
git clone https://github.com/rikiprimus/BE-Recipes.git
```
2. **Install Dependencies**: install all required dependencies and add 'dev' to the script section to use nodemon.
```
npm install
```
```
"scripts": {
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
3. **Environment Configuration**: Set the necessary environment variables in the `.env` file to set the application settings.
```
DB_HOST=
DB_USER=
DB_NAME=
DB_PASSWORD=
DB_PORT=

JWT_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
4. **Run Server**: Start the server with command.
```
npm start
```
5. **Test API**: First, you need to import collections to Postman to test and explore the API.

## Features
- **CRUD Operations**: Allows users to create, read, update, and delete entities within the system.
- **Authorization and Authentication**: Validate the registered account.
- **Upload File Photo**: Upload photo files to cloadinary and save the link to the database.
- **Sort**: Provides options to sort data based on specific criteria, such as name, date, or price.
- **Search**: Enables users to search for data based on specific search criteria, with support for partial text search.
- **Pagination**: Divides search results or data into separate pages to improve performance and the user experience.
- **Env Management**: Utilizes environment variables to configure the application, such as database connections or other global settings.
- **Postman Collection**: Includes a Postman collection containing API requests that can be used to test and document the API.

## Routes API to use
1. '/' GET
  - http://localhost:3000/recipes
  - http://localhost:3000/users
  - http://localhost:3000/category

2. '/' POST
  - http://localhost:3000/register
  - http://localhost:3000/login

3. '/:id' DELETE : use 'id' for find data, then delete
  - http://localhost:3000/recipes/id
  - http://localhost:3000/users/id
  - http://localhost:3000/category/id
    
4. '/:id' UPDATE : use 'id' for find data, then update
  - http://localhost:3000/recipes/id
  - http://localhost:3000/users/id
  - http://localhost:3000/category/id

## Deployed API
