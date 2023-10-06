import { Router } from "express";
import { check, param } from "express-validator";
import { addBin} from "../controllers/bin.controllers.js";
import validateDocuments from "../middlewares/validate.documents.js";
import validateJWT from "../middlewares/validate.jwt.js";
const router = Router();


export default router;