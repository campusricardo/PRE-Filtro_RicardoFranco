import { Router } from "express";
import { check } from "express-validator";
import { addUser, loginUser, updateUser, getOneUser, deleteUser } from '../controllers/user.controllers.js';
import {verifyUser, verifyUpdate} from '../middlewares/db.validators.js';
import validateDocuments  from "../middlewares/validate.documents.js";
import validateJWT from "../middlewares/validate.jwt.js";
const router = Router();

router.get('/users', getOneUser);

router.post('/users', [
    check('name', 'There is no name').not().isEmpty(),
    check('username', 'There is no username').not().isEmpty(),
    check('email', 'This is not an Email').not().isEmpty(),
    check('email', 'This is not an Email').isEmail(),
    check('password', 'There is no Password').not().isEmpty(),
    check('age').isNumeric(),   
    check('id', 'There is no ID').not().isEmpty(),
    verifyUser,
    validateDocuments,
], addUser);

router.post('/users/login', [
    check('username', 'The username is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validateDocuments
], loginUser);

router.patch('/users', [

    validateJWT,
    verifyUpdate,
    validateDocuments,
], updateUser);

router.delete('/users',
[
    validateJWT
]
,deleteUser);

export default router;