import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

exports.dbName = env.DB_USERNAME;
exports.dbPassword = env.DB_PASSWORD;