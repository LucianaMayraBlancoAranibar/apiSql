import express from 'express';
import config from './config';
import cors from "cors";

import campanasRoutes from './routes/campana.routes'

import './database/connection'
const app = express();
// Middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('port', config.port);
app.use(campanasRoutes)


export default app;