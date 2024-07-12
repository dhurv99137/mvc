const { Router } = require('express')
const { createPage, createProduct, getProducts, getProductsPage, deleteProduct } = require('../controllers/Prodcut.controller')
const upload = require("../middlewares/uploadImage")
const { isAdmin, isLoggedIn } = require('../middlewares/user')

const productRoute = Router()

productRoute.get("/create",isLoggedIn,isAdmin, createPage)
productRoute.post("/",isLoggedIn,isAdmin, upload.single("img"), createProduct)

productRoute.get("/",isLoggedIn, getProducts)
productRoute.get("/page",isLoggedIn, getProductsPage)

productRoute.get("/:id",isLoggedIn,isAdmin,deleteProduct)

module.exports = productRoute