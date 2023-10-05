import { Router } from "express";
import { check, param } from "express-validator";
import { addCommoditie, sellPortafolio} from "../controllers/portafolio.controllers.js";
import validateDocuments from "../middlewares/validate.documents.js";
import validateJWT from "../middlewares/validate.jwt.js";
import {validateRawMaterial} from "../middlewares/db.validators.js";
const router = Router();

router.post('/portafolios/:raw',[
    validateDocuments,
    validateJWT], addCommoditie);

router.delete('/portafolios/:raw', [
    validateJWT,
    validateRawMaterial,
    validateDocuments,
], sellPortafolio);

export default router;