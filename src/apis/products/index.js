import express from "express";
import uniqid from "uniqid";
import { getProducts, writeProducts } from "../../lib/fs-tools.js";
import { checkProductSchema, checkValidationResult } from "./validation.js";



const productsRouter = express.Router()

productsRouter.post("/", checkProductSchema, checkValidationResult, async (req, res, next) => {
    try {
      const newProduct = { ...req.body, createdAt: new Date(), id: uniqid() }
      const products = await getProducts()
  
      products.push(newProduct)
  
      await writeProducts(products)
  
      res.status(201).send({ id: newProduct.id })
    } catch (error) {
      next(error)
    }
  })
  
  productsRouter.get("/", async (req, res, next) => {
    try {
      const products = await getProducts()
    
     
       
        res.send(products)
      
    } catch (error) {
      next(error) 
    }
  })
  
  productsRouter.get("/:productId", async (req, res, next) => {
    try {
      const products = await getProducts()
  
      const foundProduct = products.find(product => product.id === req.params.productId)
      if (foundProduct) {
        res.send(foundProduct)
      } else {
        next(createHttpError(404, `product with id ${req.params.productId} not found!`)) 
      }
    } catch (error) {
      next(error)
    }
  })
  
  productsRouter.put("/:productId", async (req, res, next) => {
    try {
      const products = await getProducts()
  
      const index = products.findIndex(product => product.id === req.params.productId)
      if (index !== -1) {
        const oldProduct = products[index]
  
        const updatedProduct = { ...oldProduct, ...req.body, updatedAt: new Date() }
  
        products[index] = updatedProduct
  
        await writeProducts(products)
  
        res.send(updatedProduct)
      } else {
        next(createHttpError(404, `product with id ${req.params.productId} not found!`))
        
      }
    } catch (error) {
      next(error)
    }
  })
  
  productsRouter.delete("/:productId", async (req, res, next) => {
    try {
      const products = await getProducts()
  
      const remainingProducts = products.filter(product => product.id !== req.params.productId)
  
      await writeProducts(remainingProducts)
  
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  })









export default productsRouter