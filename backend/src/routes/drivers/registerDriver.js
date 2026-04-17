import express from 'express';
import registerDriverController from '../../controllers/drivers/registerDriverController.js';

const router = express.Router();

router.route("/").post(registerDriverController.registerDriver);
router.route("/verifyCodeEmail").post(registerDriverController.verifyEmail);

export default router; 