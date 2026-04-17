import express from "express"
import packageController from "../controllers/packageController.js"

const router = express.Router()

router.route("/")
.get(packageController.getPackage)
.post(packageController.insertPackage)

router.route("/:id")
.put(packageController.updatePackage)
.delete(packageController.deletePackage)

export default router;