const vehicleController = {};

import vehicleModel from "../models/vehicles.js";

//SELECT
vehicleController.getVehicle = async (req, res) => {
    const vehicles = await vehicleModel.find();
    res.json(vehicles);
};

//INSERT
vehicleController.insertVehicle = async (req, res) => {
    const { driverId, plate, model, capacity, status } =
        req.body;

    const newVehicle = new vehicleModel({
        driverId,
        plate,
        model,
        capacity,
        status
    });

    await newVehicle.save();
    res.json({ message: "Vehicle saved" });
};

//ELIMINAR
vehicleController.deleteVehicle = async (req, res) => {
    await vehicleModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted" });
};

//UPDATE
vehicleController.updateVehicle = async (req, res) => {
    // Solicitamos los nuevo valores
    const { idEmployee, idProducts, rating, comment } =
        req.body;

    await vehicleModel.findByIdAndUpdate(
        req.params.id,
        {
            driverId,
            plate,
            model,
            capacity,
            status
        },
        { new: true },
    );

    res.json({ message: "Vehicle updated" });
};

export default vehicleController;




