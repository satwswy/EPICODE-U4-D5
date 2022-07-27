import express from "express";
import uniqid from "uniqid";
import { getProducts, writeProducts,saveProductsUploades, getProductsReadableStream } from "../../lib/fs-tools.js";
import { checkProductSchema, checkValidationResult } from "./validation.js";
import multer from "multer"
import { extname } from "path"
import {pipeline} from "stream"
import createHttpError from "http-errors";
import {createGzip} from "zlib"
import { getPDFReadableStream } from "../../lib/pdf-tools.js";
import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'

const cloudinaryUploader = multer({
  storage:new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "july22/products"
  },
}) , limits: {fileSize: 1024*1024},
}).single("avatar")

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
      console.log(error)
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


  productsRouter.post("/:productId/upload", multer().single("upload"), async (req, res, next) => {
    try {
        console.log("FILE: ", req.file)
        const fileName = req.params.productId + extname(req.file.originalname)
        await saveProductsUploades(fileName, req.file.buffer)
        res.send("UPLOADED")
    } catch (error) {
      next(error)
    }
  })


productsRouter.get("/new/productsJSON", (req,res,next) => {
  try {

    res.setHeader("Content-Disposition", "attachment; filename=books.json.gz")
    const source = getProductsReadableStream()
    const destination = res
    const transform = createGzip()
    pipeline(source, transform, destination, err => {
      if(err) console.log(err)
    })

  } catch (error) {
    next(error)
  }
})

productsRouter.get("/new/PDF", async (req, res, next)=>{
  try {
    const productsList = await getProducts()
    res.setHeader("Content-Disposition", "attachment; filename=books.pdf")
    const source = getPDFReadableStream(productsList)
    const destination = res
    pipeline(source, destination, err => {
      if(err) console.log(err)
    })
  } catch (error) {
    console.log(error)
  }
})


productsRouter.post("/new/cloudinary", cloudinaryUploader, async (req,res,next)=>{
  try {
    console.log("REQ FILE ", req.file)
    res.send()
  } catch (error) {
    next(error)
  }
})

export default productsRouter