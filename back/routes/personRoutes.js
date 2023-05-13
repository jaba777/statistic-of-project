import express from "express";
import {FullPersonalController,addPersonHandler,deletePersonHandler,countPeople} from '../controllers/personController.js';

const router = express.Router();

router.get('/auth-person',FullPersonalController)
router.post('/add-person',addPersonHandler)
router.delete('/delete-person/:id',deletePersonHandler)
router.get('/count-people',countPeople)


export default router;