const packageController = {};

import packageModel from "../models/packages.js";

//SELECT
packageController.getPackage = async (req, res) => {
    const packages = await packageModel.find();
    res.json(packages);
};

//INSERT
packageController.insertPackage = async (req, res) => {
    const { senderId, receiverId, trackingNumber, weight, dimensions, description, status } =
        req.body;

    const newPackage = new packageModel({
        senderId,
        receiverId,
        trackingNumber,
        weight,
        dimensions,
        description,
        status
    });

    await newPackage.save();
    res.json({ message: "Package saved" });
};

//ELIMINAR
packageController.deletePackage = async (req, res) => {
    await packageModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
};

//UPDATE
packageController.updatePackage = async (req, res) => {
    // Solicitamos los nuevo valores
    const { idEmployee, idProducts, rating, comment } =
        req.body;

    await packageModel.findByIdAndUpdate(
        req.params.id,
        {
            senderId,
            receiverId,
            trackingNumber,
            weight,
            dimensions,
            description,
            status
        },
        { new: true },
    );

    res.json({ message: "Package updated" });
};

export default packageController;




