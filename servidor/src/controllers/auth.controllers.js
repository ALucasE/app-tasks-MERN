import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //ENCRIPTA LA CONTRASEÑA
    const passwordHash = await bcrypt.hash(password, 10);

    //CREA EL USUARIO
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    //GUARDA EL USUARIO
    const userSaved = await newUser.save();

    //CREA EL TOKEN DE ACCESO
    const token = await createAccessToken({ id: userSaved._id });

    //ENVIA LOS DATOS AL FRONT
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //BUSCA EL USUARIO POR EMAIL
    const userFound = await User.findOne({ email });

    //VALIDA SI EL USUARIO EXISTE
    if (!userFound) return res.status(400).json({ message: "Credenciales invalidas" });

    //VALIDA SI COINCIDE DE LA CONTRASEÑA
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Credenciales invalidas" });

    //CREA EL TOKEN DE ACCESO
    const token = await createAccessToken({ id: userFound._id });

    //ENVIA LOS DATOS AL FRONT
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const getProfile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ messaje: "User not found" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  });
};
