import express from "express"

import loginCustomerController from "../../controllers/customers/loginCustomerController.js"

const router = express.Router();

router.route("/").post(loginCustomerController.login);

export default router;