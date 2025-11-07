/****** core modules import here *******/
import cors from "cors";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";


/*******internal files import here *******/
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import adminRoutes from './routes/adminRoutes/adminRoutes.js';
import authRoutes from './routes/authroute/authUserRoutes.js';
import healthRoutes from "./routes/health/healthRoute.js";
import productRoutes from './routes/productroute/productRoute.js';
import reviewRoutes from './routes/review/reviewRoutes.js';
import userRoutes from './routes/userroute/userRoutes.js';



/****** express app initilazation here *******/
const app = express();




/************swagger api document setup *************/
const swaggerDocument = YAML.load(path.join(process.cwd(), "openapi.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



/********* Body Data Parse **********/
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


/*********** CORS  Middleware Here ***********/
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:3000",
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // allow non-browser requests
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);




/********** auth Routes Define Here *********/
app.use("/", authRoutes);


/********** user Routes Define Here *********/
app.use("/", userRoutes);



/********** Product Routes Define Here *********/
app.use("/", productRoutes);



/********** Profile Routes Define Here *********/
app.use("/", reviewRoutes);




/********** Admin Routes Define Here *********/
app.use("/admin", adminRoutes);





/********** health check Routes Define Here *********/
app.use("/", healthRoutes);






//global error handling middlewares
app.use(notFound);
app.use(errorHandler);




/******* Export the module ******/
export default app;
