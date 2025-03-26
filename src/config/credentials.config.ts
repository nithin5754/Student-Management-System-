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
  }
};

export default credentialsConfig;
