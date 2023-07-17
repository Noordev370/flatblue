import 'dotenv/config';


// database
export const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

// JSON Web Token
export const JWT_SECRET = String(process.env.JWT_SECRET);

// app
export const PORT = Number(process.env.PORT);