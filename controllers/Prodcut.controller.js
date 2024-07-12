const Product = require("../models/Product.model")

// create Page 

const createPage = (req, res) => {
  res.render("createProduct")
}

const createProduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.img = req.file.path
    }
    let product = await Product.create(req.body)
    res.send("Product create")
  } catch (error) {
    res.send("eroor creating Product")
  }
}

// products

const getProducts=async(req,res)=>{
  let products =await Product.find()
  res.send(products)
}

// products page

const getProductsPage = async (req, res) => {
  let products = await Product.find()
  res.render("products", { products })
}

const deleteProduct= async (req, res) =>{
  let {id} = req.params
  console.log(id, "delete");
  let data=await Product.findByIdAndDelete(id)
  res.redirect("/product/page")
}

module.exports = { createPage, createProduct,getProducts, getProductsPage,deleteProduct }