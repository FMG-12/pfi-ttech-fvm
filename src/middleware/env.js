import dotenv from 'dotenv'

dotenv.config()

const env = {
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    PORT: process.env.PORT,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    JWT_SECRET: process.env.JWT_SECRET
};

export default env;




