import PostModel from "../models/posts.model.js";
import UserModel from "../models/user.model.js";
import ReportModel from "../models/report.model.js";
import UserProfileModel from "../models/userprofile.model.js";

async function createReport(req, res) {
  try {
    var exist;

    if (!req.body) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Faltan campos obligatorios por completar.",
        });
    }

    try {
      exist = await PostModel.findById(req.body.post_id);
      if (exist === null) {
        return res
          .status(404)
          .send({ success: false, message: "No se ha encontrado el post" });
      }
    } catch (err) {
      return res
        .status(404)
        .send({ success: false, message: "No se ha encontrado el post" });
    }

    const reportCreated = await ReportModel.create(req.body);

    return res.json({ success: true, reportCreated });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "No se pudieron enviar los datos, error de backend",
        error: err.message,
      });
  }
}

async function banUserPERMANENTLY(req, res) {
    try {
      if (!req.body.id) {
        return res.status(400).send({
          success: false,
          message: "Faltan campos obligatorios por completar.",
        });
      }
  
      const exist = await UserModel.findById(req.body.id);
      if (!exist) {
        return res.status(404).send({ success: false, message: "No se ha encontrado el usuario." });
      }
  
      const postsOfUser = await PostModel.find({ userId: req.body.id });
  
      await Promise.all(postsOfUser.map(async (post) => {
        await ReportModel.deleteMany({ post_id: post._id });
      }));
  
      await PostModel.deleteMany({ userId: req.body.id });
      await UserProfileModel.deleteMany({ userId: req.body.id });
      await UserModel.findByIdAndDelete(req.body.id);
  
      return res.send({ success: true });
    } catch (err) {
      return res.status(500).send({ success: false, message: "No se pudieron obtener los datos, error de backend." });
    }
  }
  
  

async function allReport(req, res) {
  try {
    const report = await ReportModel.find({});

    return res.send(report);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "No se pudieron obtener, error de backend" });
  }
}

export { createReport, banUserPERMANENTLY, allReport };
