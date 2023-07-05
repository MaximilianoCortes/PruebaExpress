import PostModel from "../models/posts.model.js";


async function createPost(req, res) {
    try {
      
      if(!req.body.title || !req.body.body_text || req.body.likes){
        return res.status(400).send({success:false, message:"Faltan campos obligatorios por completar."})
      }

     const postCreated = await PostModel.create({...req.body, userId : req.user._id, likes:0});
   
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

  async function reaction(req, res) {
    try {

   const post = await PostModel.findById(req.body.post_id)
   console.log(post.likes)
   const updatedLikePost= post.likes + req.body.reaction

   await PostModel.updateOne({_id:req.body.post_id},{likes:updatedLikePost})

      return res.status(200).send({success:true});
    } catch (err) {
      return res.status(500).send({success:false,message:"No se pudieron obtener, error de backend"});
    }
  }

  export { createPost, deletePostById, allPosts ,reaction};
