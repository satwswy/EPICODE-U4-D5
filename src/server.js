import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./apis/products/index.js";
import reviewsRouter from "./apis/reviews/index.js";


const server = express();
const port = process.env.PORT || 3001

const whitelist = ["http://localhost:3000", "https://mywonderfulfe.com"]

server.use(cors({origin: (origin, callback) => {

}}));


server.use(express.json());


server.use("/products", productsRouter)
server.use("/products/:productId/reviews", reviewsRouter)









server.listen(port,()=>{
    console.log("Server is running on port : ", port)
});