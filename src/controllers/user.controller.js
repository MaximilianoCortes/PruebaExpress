import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';

async function createUser(req, res) {
    try {
        
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const encryptedPassword = bcrypt.hashSync(password, 10);

        if (!name) {
            return res.status(400).json({ success: false, message: 'Falta el campo name' });
          }
        if (!email) {
            return res.status(400).json({ success: false, message: 'Falta el campo email' });
        }
        if (!dni) {
            return res.status(400).json({ success: false, message: 'Falta el campo dni' });
        }
        if (!password) {
            return res.status(400).json({ success: false, message: 'Falta el campo password' });
        }


      const userCreated = await UserModel.create({ name: name, email: email, dni: dni, password: encryptedPassword});
      return res.status(200).json({ success: true, user: userCreated });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al crear el usuario', error: err.message });
    }
  }

  async function getUsers(req, res) {
    try {
      const users = await UserModel.find({});
      return res.send(users);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: err.message });
    }
  }

  async function login(req, res){
    try{
      const email = req.body.email;

      if (!email) {
        return res.status(400).json({ logged: false, message: 'Falta el campo email' });
    }
    
    const user = await UserModel.findOne({ email: email });
    const encryptedPassword = user.password;
    const password = req.body.password;
    const isMatch = await bcrypt.compare(password, encryptedPassword);

    if (isMatch === false ){
        return res.status(400).json({ logged: false, message: 'Credenciales incorrectas' });
    } else {
      return res.status(200).json({ logged: true, message: 'Credenciales correctas' });
    }
    
    }catch (err) {
      return res.status(500).json({ logged: false, message: 'Error de login', error: err.message });
    }
  }

  async function editProfile(req, res){
    try {
      const userId = req.body.userId;
      const description = req.body.description;
      const picture = req.body.picture;
      const banner = req.body.banner;
      const userProfile = await UserProfileModel.updateOne({ _id: userId }, { description, picture, banner });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: 'No se pudieron actualizar los datos, error de backend.', error: err.message });
    }
  }
  export { createUser, getUsers, login, editProfile };