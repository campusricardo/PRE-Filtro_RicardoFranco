import { Router } from "express";
import { check, param } from "express-validator";
import { getWasteObjects, addWasteObject, updateWasteObject, deleteWasteObject} from "../controllers/wasteobject.controller.js";
import validateDocuments from "../middlewares/validate.documents.js";
import {validateWasteObject, validateWasteObjectUpdate} from "../middlewares/db.validators.js";

import validateJWT from "../middlewares/validate.jwt.js";
const router = Router();

router.get('/waste-objects', [
    validateJWT
],
    getWasteObjects
);

router.post('/waste-objects', [
    validateWasteObject,
    validateJWT,
    validateDocuments
],
    addWasteObject
);

router.patch('/waste-objects/:waste', [
    validateWasteObjectUpdate,
    validateJWT,
    validateDocuments

],
    updateWasteObject
);

router.delete('/waste-objects/:waste', [
    validateJWT,
    validateDocuments
],
    deleteWasteObject
);
export default router;