import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import customerModel from "../../models/customers.js";

import { config } from "../../config.js";

//Creo un array de funciones
const registerCustomerController = {};

registerCustomerController.registerCustomer = async (req, res) => {
  try {
    //1 solicitar todos los datos a guardar
    let { name,
      lastName,
      birthdate,
      email,
      password,
      isVerified,
      loginAttemps,
      timpeOut
    } = req.body;

    const existingCustomer = await customerModel.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newCustomer = new customerModel({
      name,
      lastName,
      birthdate,
      email,
      password: passwordHash,
      isVerified: isVerified || false,
      loginAttemps,
      timpeOut,
    });

    await newCustomer.save();

    const verificationCode = crypto.randomBytes(3).toString("hex");

    // Guardamos este codigo en un token
    const tokenCode = jsonwebtoken.sign(
      //Que vamos a guardar?
      { email, verificationCode },
      //Secret key
      config.JWT.secret,
      //Cuando expira
      { expiresIn: "15m" }
    );

    res.cookie("verificationTokenCookie", tokenCode, {
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password
      }
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificación de cuenta",
      text: "Para verificar tu cuenta, utiliza este código: " + verificationCode + "Expira en 15 minutos"
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: " + error);
        return res.status(500).json({ message: "Error sending verification email" });
      }
      res.status(200).json({ message: "Email sent: " + info.response });

    });

  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

registerCustomerController.verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    const token = req.cookies.verificationTokenCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    const { email, verificationCode: storedCode } = decoded;

    if (verificationCode !== storedCode) {
      return res.status(400).json({ message: "Invalid code" })
    }

    const client = await customerModel.findOne({email});
    client.isVerified = true;
    await client.save();

    res.clearCookie("verificationTokenCookie")

    res.json({ message: "Email verified successfully" })

  }
  catch (error) { 
    console.error("Error:" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default registerCustomerController;