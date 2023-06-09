import { Router } from "express";

import {
    getDonaciones,
    getDonacionById,
    deleteDonacionById,
    updateDonacionById,
    createNewDonacion,
  } from '../controllers/donacion.Controller'

const router=Router()
router.get('/donacion',getDonaciones)

router.post('/donacion',createNewDonacion)

router.get("/donacion/:id", getDonacionById);

router.delete("/donacion/:id", deleteDonacionById);
router.put("/donacion/:id", updateDonacionById);

export default router