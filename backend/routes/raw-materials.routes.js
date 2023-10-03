import { Router } from "express";
import { check } from "express-validator";
import { addRawMaterial, getRawMaterial } from "../controllers/raw-materials.controllers.js";
import validateDocuments from "../middlewares/validate.documents.js";
import validateJWT from "../middlewares/validate.jwt.js";
const router = Router();

router.get('/raw-materials',[validateJWT], getRawMaterial)

router.post('/raw-materials', [
    check('name', 'The name is required').not().isEmpty(),
    check('valuePerTon', 'value per ton is required').not().isEmpty(),
    check('valuePerTon', 'value per ton must be a Number').isNumeric(),
    check('weightGcubicM', 'weightGcubicM is required').not().isEmpty(),
    check('weightGcubicM', 'weightGcubicM must be a Number').isNumeric(),

validateJWT,
validateDocuments
], addRawMaterial);

export default router;