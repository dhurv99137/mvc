const { Router } = require('express')
const { get, getUsers, createUser, singupPage, Login, loginPage, deleteUser, updateUser, homePgee } = require('../controllers/user.controller')
const isValid = require('../middlewares/dataValid')
const multer = require('multer')

let userRoute = Router()

userRoute.get("/test", get)
userRoute.get("/", getUsers)

userRoute.post("/",isValid, createUser)
userRoute.post("/login", Login)

userRoute.delete("/:id", deleteUser)                                                        

userRoute.patch("/:id",updateUser)

userRoute.get("/signup", singupPage)
userRoute.get("/login", loginPage)
userRoute.get("/home",homePgee)


module.exports = userRoute