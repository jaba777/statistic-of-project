import express from "express";
import {FullPersonalController} from '../controllers/personController.js';

const router = express.Router();

router.get('/auth-person',FullPersonalController)


export default router;