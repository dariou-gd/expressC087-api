import express from "express"
import cookieParser from "cookie-parser";

import customerRoutes from "./src/routes/customers/customer.js"
import driverRoutes from "./src/routes/drivers/driver.js"
import packageRoutes from "./src/routes/package.js"
import vehicleRoutes from "./src/routes/vehicle.js"

import registerCustomerRoutes from "./src/routes/customers/registerCustomer.js"
import registerDriverRoutes from "./src/routes/drivers/registerDriver.js"

import loginCustomerRoutes from "./src/routes/customers/loginCustomer.js"


const app = express();
app.use(cookieParser());

app.use(express.json());


app.use("/api/customers", customerRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/vehicles", vehicleRoutes);

app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/registerDriver", registerDriverRoutes);

app.use("/api/loginCustomers", loginCustomerRoutes);

export default app;