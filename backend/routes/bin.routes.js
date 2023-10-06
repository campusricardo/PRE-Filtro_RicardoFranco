import { Router } from "express";
import { check, param } from "express-validator";
import { getBins, addBin, updateBin, deleteBin} from "../controllers/bin.controllers.js";
import validateDocuments from "../middlewares/validate.documents.js";
import validateJWT from "../middlewares/validate.jwt.js";
import {validateBin, validateBinUpdate} from "../middlewares/db.validators.js";
const router = Router();

router.get('/bins', [validateJWT], getBins);


router.post('/bins', [
    check('name', ['name is required']).not().isEmpty().isString(),
    check('binColor').not().isEmpty().isString(),
    validateJWT,
    validateBin,
    validateDocuments
],addBin );

router.patch('/bins/:bin', [
    validateJWT,
    validateBinUpdate,
    validateDocuments
], updateBin);

router.delete('/bins/:bin', [
    validateJWT
], deleteBin)

export default router;