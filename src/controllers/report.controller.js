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
      if (!req.params.user_id) {
        return res.status(400).send({
          success: false,
          message: "Faltan campos obligatorios por completar.",
        });
      }
  
      const exist = await UserModel.findById(req.params.user_id);
      if (!exist) {
        return res.status(404).send({ success: false, message: "No se ha encontrado el usuario." });
      }
  
      const postsOfUser = await PostModel.find({ userId: req.params.user_id });
  
      await Promise.all(postsOfUser.map(async (post) => {
        await ReportModel.deleteMany({ post_id: post._id });
      }));
  
      await PostModel.deleteMany({ userId: req.params.user_id });
      await UserProfileModel.deleteMany({ userId: req.params.user_id });
      await UserModel.findByIdAndDelete(req.params.user_id);
  
      return res.send({ success: true });
    } catch (err) {
      return res.status(500).send({ success: false, message: "No se pudieron obtener los datos, error de backend." });
    }
  }

  async function dismissReport(req, res) {
    try {
      if (!req.params.report_id) {
        return res.status(400).send({
          success: false,
          message: "Id Invalido",
        });
      }

      await ReportModel.findByIdAndDelete(req.params.report_id);
 
  
      return res.send({ success: true });
    } catch (err) {
      return res.status(500).send({ success: false, message: "No se pudieron obtener los datos, error de backend." });
    }
  }

  async function allReportUsers(req, res) {
    try {
      const reportedPosts = await ReportModel.find({});
      const postIds = reportedPosts.map(report => report.post_id);
      const postReported = await PostModel.find({_id: {$in: postIds}});
      const userIds = postReported.map(post => post.userId);
      const users = await UserModel.find({_id: {$in: userIds}});
  
      return res.send(users);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send({ message: "No se pudieron obtener los usuarios reportados, error del servidor" });
    }
  }
  

  async function allReport(req, res) {
    try {
      const uniquePostIds = await ReportModel.distinct("post_id");
      const reports = await ReportModel.find({ post_id: { $in: uniquePostIds } });
  
      return res.send(reports);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send({ message: "No se pudieron obtener los reportes, error del servidor" });
    }
  }
  

export { createReport, banUserPERMANENTLY, allReport,allReportUsers ,dismissReport};
