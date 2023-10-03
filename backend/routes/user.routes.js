import { Router } from "express";
import { check } from "express-validator";
import { addUser, loginUser } from '../controllers/user.controllers.js';
import {verifyUser} from '../middlewares/db.validators.js';
import validateDocuments  from "../middlewares/validate.documents.js";

const router = Router();


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
export default router;