import app from "./app.js";
import connectDB from './config/db.js';
import environment from "./config/env.js";


/******** PORT Define *******/
const PORT = process.env.PORT || 5000;


/********** Connect to Database Here **********/
connectDB();



if (environment === "development") {
  /*********** Start The Server ***********/
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT} in ${environment} mode`);
    console.log(`📘 Docs available at http://localhost:${PORT}/api-docs`);
  });

}


export default app;
