import { Router } from "express";

import {
    getCampanas,
    getCampanaById,
    deleteCampanaById,
    updateCampanaById,
  } from '../controllers/campana.Controller'

const router=Router()
router.get('/campanas',getCampanas)

router.get("/campanas/:id", getCampanaById);

router.delete("/campanas/:id", deleteCampanaById);

router.put("/campanas/:id", updateCampanaById);



export default router