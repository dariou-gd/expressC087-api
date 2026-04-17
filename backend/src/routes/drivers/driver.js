import express from "express"
import driverController from "../../controllers/drivers/driverController.js"

const router = express.Router()

router.route("/")
.get(driverController.getDriver)

router.route("/:id")
.put(driverController.updateDriver)
.delete(driverController.deleteDriver)

export default router;