import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./apis/products/index.js";
import reviewsRouter from "./apis/reviews/index.js";
import createHttpError from "http-errors";


const server = express();
const port = process.env.PORT || 3001

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

server.use(cors({origin: (origin, corsNext) => {
    console.log("ORIGIN: ", origin)
if (!origin || whitelist.indexOf(origin)!== -1) {
    corsNext(null, true)
} else {
    corsNext(createHttpError(400, `Cors Error! Your origin${origin} is not in the list`))
}
}}));


server.use(express.json());


server.use("/products", productsRouter)
server.use("/products/:productId/reviews", reviewsRouter)









server.listen(port,()=>{
    console.log("Server is running on port : ", port)
});