/**
 * config.ts
 * */

import {Sequelize} from "sequelize";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const dbDatabase = String(process.env.DB_DATABASE);
const dbPassword = String(process.env.DB_PASSWORD);
const dbUser = String(process.env.DB_USER);
const dbHost = String(process.env.DB_HOST);

const dialectOptions = process.env.NODE_ENV === "development" ? {} : {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};

export const sequelize = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  dialectOptions
});