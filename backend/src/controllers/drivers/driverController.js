const driverController = {};

import driverModel from "../../models/drivers.js";

// SELECT
driverController.getDriver = async (req, res) => {
  const drivers = await driverModel.find();
  res.json(drivers);
};

// ELIMINAR
driverController.deleteDriver = async (req, res) => {
  await driverModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Driver deleted" });
};

// UPDATE
driverController.updateDriver = async (req, res) => {
  // Solicitamos los nuevo valores
  const { name, lastName, email, password, phone, licenseNumber,isActive } =
    req.body;

  await driverModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      lastName,
      email,
      password,
      phone,
      licenseNumber,
      isActive
    },
    { new: true }
  );

  res.json({ message: "Driver updated" });
};

export default driverController;