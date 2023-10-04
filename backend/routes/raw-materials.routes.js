import { Router } from "express";
import { check } from "express-validator";
import { addRawMaterial, getRawMaterial, updateRawMaterial,  deleteRawMaterial} from "../controllers/raw-materials.controllers.js";
import validateDocuments from "../middlewares/validate.documents.js";
import validateJWT from "../middlewares/validate.jwt.js";
import {verifyRawMaterialUpdate} from "../middlewares/db.validators.js";
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

router.patch('/raw-materials/:oid', [
    validateJWT,
    verifyRawMaterialUpdate,
    validateDocuments
], updateRawMaterial);


router.delete('/raw-materials/:oid', [
    validateJWT
], deleteRawMaterial);

export default router;