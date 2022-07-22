import {fileURLToPath} from "url"
import {dirname, join} from "path"
import fs from "fs-extra"

const { readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

const productsJSONPath = join(dataFolderPath, "products.json")
const productsPublicFolderPath = join(process.cwd(), "./public/img/products")


export const getProducts = () => readJSON(productsJSONPath)
export const writeProducts = productsArray => writeJSON(productsJSONPath, productsArray)
export const saveProductsUploades = (fileName, contentAsABuffer) => writeFile(join(productsPublicFolderPath, fileName), contentAsABuffer)