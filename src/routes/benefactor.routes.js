import { Router } from "express";

import {
    getBenefactor,
    getBenefactorById,
    createNewBenefactor,
 
    updateBenefactorById,
  } from '../controllers/benefactor.Controller'

const router=Router()
router.get('/benefactor',getBenefactor)

router.get("/benefactor/:id", getBenefactorById);

router.post('/benefactor', createNewBenefactor);

router.put("/benefactor/:id", updateBenefactorById);



export default router