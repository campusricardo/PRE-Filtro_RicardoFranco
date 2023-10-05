import { Router } from "express";
import { check } from "express-validator";
import { addCommoditie} from "../controllers/portafolio.controllers.js";
import validateDocuments from "../middlewares/validate.documents.js";
import validateJWT from "../middlewares/validate.jwt.js";
const router = Router();

router.post('/portafolios/:raw',[validateJWT], addCommoditie);

export default router