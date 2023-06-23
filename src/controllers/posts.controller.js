import PostModel from "../models/posts.model.js";

async function createPosts(req, res) {
    try {
        
      const postCreated = await PostModel.create(req.body);

      if(!postCreated.userId || !postCreated.title || !postCreated.body_text){
        return res.status(400).send("Faltan campos obligatorios por completar.")
      }

      return res.json(postCreated);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudieron enviar los datos, error de backend', error: err.message });
    }
  }

  async function deletePostsById(req, res) {
    try {
      const postId = req.params.post_id;
      const message = await PostModel.deleteOne({ _id: postId });
      return res.send({message: message});
    } catch (err) {
      return res.status(500).send(err);
    }
  }


  //este ta en user router
  async function getPosts(req, res) {
    const post = await PostModel.find({});
    return res.send(post);
  }

  export { createPosts, deletePostsById, getPosts };