import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;

export default { MONGO_URI , SECRET};