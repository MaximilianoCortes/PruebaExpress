import PostModel from "../models/posts.model.js";
import UserModel from "../models/user.model.js";


async function createPost(req, res) {
    try {
      
      var exist

      if(!req.body.userId || !req.body.title || !req.body.body_text || req.body.likes){
        return res.status(400).send({success:false, message:"Faltan campos obligatorios por completar."})
      }

    const postCreated = await PostModel.create(req.body);

     const userId=postCreated.userId;

     try{
      exist = await UserModel.findById(userId)
      if(exist===null){
        return res.status(404).send( {success:false , message:"No se han encontrado usuario"})
      }
     }catch(err){
      return res.status(404).send( {success:false , message:"No se han encontrado usuarios"})
     }
   
      return res.json({success:true ,postCreated});
    } catch (err) {
        return res.status(500).json({success:false ,message: 'No se pudieron enviar los datos, error de backend', error: err.message });
    }
  }

  async function deletePostById(req, res) {
    try {
      const postId = req.params.post_id;
      const message = await PostModel.deleteOne({ _id: postId });
      return res.send({message: message});
    } catch (err) {
      return res.status(500).send(err);
    }
  }


  async function allPosts(req, res) {
    try {
      const post = await PostModel.find({});

      return res.send(post);
    } catch (err) {
      return res.status(500).send({message:"No se pudieron obtener, error de backend"});
    }

  }

  export { createPost, deletePostById, allPosts };
