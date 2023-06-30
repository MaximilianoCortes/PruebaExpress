import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import UserProfileModel from "../models/userprofile.model.js";
import { generateToken, verifyToken } from "../utils/jwt.utils.js";

async function register(req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Faltan campos obligatorios por completar.",
        });
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const user = await UserModel.create({
      ...req.body, password: encryptedPassword
    });
    const userCreatedId = user._id;
    await UserProfileModel.create({ userId: userCreatedId });
    return res.status(200).json({ success: true, user: user });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "No se pudieron enviar los datos, error de backend.",
        error: err.message,
      });
  }
}

async function login(req,res){
  const user = await UserModel.findOne({email:req.body.email})
  .select('+password')
  .exec();

  if(!user){
    return res.status(404).send({error: "Email incorrecto"})
  }
  const isCorrect = await bcrypt.compare(req.body.password, user.password);
  if(!isCorrect){
    return res.status(400).send({error: "Contraseña incorrecta"})
  }

  const token = generateToken(user)

    return res.status(200).send({ user, token })
  

}

async function getUserById(req, res) {
  try {
    var user;
    try {
      user = await UserModel.findById(req.id);
      if (user === null) {
        return res
          .status(404)
          .send({ success: false, message: "No se han encontrado usuario" });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ success: false, message: "No se han encontrado usuario" });
    }

    return res.send(user);
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "No se pudieron obtener los datos, error de backend.",
        error: err.message,
      });
  }
}





async function getUsers(req, res) {
  
  try {
    const users = await UserModel.find({});
    return res.send(users);
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error al obtener usuarios",
        error: err.message,
      });
  }
}



async function getProfileByUserId(req, res) {
  try {
    const userId = req.params.userId;
    let profile;
    try {
      profile = await UserProfileModel.findOne({userId: userId});
      if (profile === null) {
        return res
          .status(404)
          .send({ success: false, message: "No se ha encontrado el perfil del usuario" });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ success: false, message: "No se ha encontrado el perfil del usuario" });
    }

    return res.send(profile);
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "No se pudieron obtener los datos, error de backend.",
        error: err.message,
      });
  }
}


async function editProfile(req, res) {
  try {
    const userId = req.params.userId;
    try {
      user = await UserModel.findById(userId);
      if (user === null) {
        return res
          .status(500)
          .json({
            success: false,
            message: "No se pudieron actualizar los datos, error de backend.",
            error: err.message,
          });
      }
    } catch (err) {
      return res
        .status(500)
        .json({
          success: false,
          message: "No se pudieron actualizar los datos, error de backend.",
          error: err.message,
        });
    }
    const { description, picture, banner } = req.body;
    const updateFields = {};
    if (description) updateFields.description = description;
    if (picture) updateFields.picture = picture;
    if (banner) updateFields.banner = banner;
    await UserProfileModel.updateOne({ userId: userId }, updateFields);
    res.json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "No se pudieron actualizar los datos, error de backend.",
        error: err.message,
      });
  }
}

export { login, register, getUsers, editProfile, getUserById, getProfileByUserId};
