import express from "express"
import vehicleController from "../controllers/vehiclesController.js"

const router = express.Router()

router.route("/")
.get(vehicleController.getVehicle)
.post(vehicleController.insertVehicle)

router.route("/:id")
.put(vehicleController.updateVehicle)
.delete(vehicleController.deleteVehicle)

export default router;