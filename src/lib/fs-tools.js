import {fileURLToPath} from "url"
import {dirname, join} from "path"
import fs from "fs-extra"

const { readJSON, writeJSON, writeFile, createReadStream, createWriteStream } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const reviewsJSONPath = join(dataFolderPath, "reviews.json")
const productsJSONPath = join(dataFolderPath, "products.json")
const productsPublicFolderPath = join(process.cwd(), "./public/img/products")

export const getReviews = () => readJSON(reviewsJSONPath)
export const writeReviews = reviewsArray => writeJSON(reviewsJSONPath, reviewsArray)
export const getProducts = () => readJSON(productsJSONPath)
export const writeProducts = productsArray => writeJSON(productsJSONPath, productsArray)
export const saveProductsUploades = (fileName, contentAsABuffer) => writeFile(join(productsPublicFolderPath, fileName), contentAsABuffer)

export const getProductsReadableStream = () => createReadStream(productsJSONPath)

export const pdfWritableStream = (filename) => createWriteStream(join(dataFolderPath, filename))