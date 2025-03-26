import express from "express";
import credentialsConfig from "./config/credentials.config";
import connectionDB from "./config/database.config";
import ErrorHandlingMiddleWare from "./middlewares/error.middleware";

import adminRoutes from './routes/admin.route'
import loginRoutes from './routes/user.route'

const app = express();
app.use(express.json());

const startServer =async ()=>{
  try {
    await connectionDB();
    console.log("MongoDB connected successfully");
    app.listen(credentialsConfig.PORT, () => {
      console.log(`Server started on port ${credentialsConfig.PORT}`);
    });
    
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1); 
  }
}

app.use(ErrorHandlingMiddleWare);
  
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/user',loginRoutes)

startServer()