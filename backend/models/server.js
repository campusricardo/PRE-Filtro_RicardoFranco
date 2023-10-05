import express from 'express';
import cors from 'cors';
import dbConnection from '../database/config.js';
import userRouter from '../routes/user.routes.js';
import rawMaterialRouter from '../routes/raw-materials.routes.js';
import portafolioRouter from '../routes/portafolios.routes.js';
export default class Server {
    constructor(){
        this.api = '/api';
        this.app = express();
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes() {
        this.app.use(this.api, userRouter);
        this.app.use(this.api, rawMaterialRouter);
        this.app.use(this.api, portafolioRouter);
    }
    listen() {
        this.app.listen(process.env.PORT, ()=> {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    }
}