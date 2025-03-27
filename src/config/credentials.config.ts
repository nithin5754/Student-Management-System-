import dotenv from "dotenv";

dotenv.config();

interface ICredentialsConfig {
  PORT: string;
  DATABASE: {
    MONGO_URI: string;
  };
  ADMIN:{
    EMAIL:string,
    PASSWORD:string
  },
  JWT :{
    JWT_SECRET:string,
  }
}

const credentialsConfig: ICredentialsConfig = {
  PORT: process.env.PORT as string,
  DATABASE: {
    MONGO_URI: process.env.MONGO_URI as string,
  },
  ADMIN:{
   EMAIL: process.env.ADMIN_EMAIL || 'admin@admin.com',
PASSWORD: process.env.ADMIN_PASSWORD || 'admin'
  },
  JWT :{
    JWT_SECRET: process.env.JWT_SECRET as string ,
  }
};

export default credentialsConfig;
