const customerController = {};

import customerModel from "../../models/customers.js";

// SELECT
customerController.getCustomer = async (req, res) => {
  const customers = await customerModel.find();
  res.json(customers);
};

// ELIMINAR
customerController.deleteCustomer = async (req, res) => {
  await customerModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
};

// UPDATE
customerController.updateCustomer = async (req, res) => {
  // Solicitamos los nuevo valores
  const { name, lastName, email, password, phone, address } =
    req.body;

  await customerModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      lastName,
      email,
      password,
      phone,
      address,
    },
    { new: true }
  );

  res.json({ message: "Customer updated" });
};

export default customerController;