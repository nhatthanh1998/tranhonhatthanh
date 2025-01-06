import express, { Express } from 'express';
import dotenv from "dotenv";
import employeeController from './resources/employees/employee.router';
import  swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import bodyParser from 'body-parser';
import connectDB from './database';

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI

export const app: Express = express();

app.use(bodyParser.json());

connectDB(MONGODB_URI as string);

// Mount Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

// Employee Router
app.use('/employees', employeeController);

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});