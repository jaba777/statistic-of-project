import express from "express";
import {FullPersonalController,addPersonHandler} from '../controllers/personController.js';

const router = express.Router();

router.get('/auth-person',FullPersonalController)
router.post('/add-person',addPersonHandler)


export default router;