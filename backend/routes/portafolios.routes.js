import { Router } from "express";
import { check, param } from "express-validator";
import { getPortafolio,addCommoditie, sellPortafolio, deletePortafolio} from "../controllers/portafolio.controllers.js";
import validateDocuments from "../middlewares/validate.documents.js";
import validateJWT from "../middlewares/validate.jwt.js";
import {validateRawMaterial} from "../middlewares/db.validators.js";
const router = Router();

router.get('/portafolios', [
    validateJWT

],
     getPortafolio);

router.post('/portafolios/:raw',[
    validateDocuments,
    validateJWT], addCommoditie);



// Someday i will finish this
router.delete('/portafolios/:raw', [
    validateJWT,
    validateRawMaterial,
    validateDocuments,
],  sellPortafolio);


router.delete('/portafolios', [
    validateJWT,
], deletePortafolio);

export default router;