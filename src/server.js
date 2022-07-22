import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./apis/products/index.js";


const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());


server.use("/products", productsRouter)









server.listen(port,()=>console.log("Server is running on port : ", port));