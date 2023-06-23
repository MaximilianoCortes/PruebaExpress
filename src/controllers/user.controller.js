import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';

async function createUser(req, res) {
    try {
        
        const name = req.body.name;
        const email = req.body.email;
        const dni = req.body.dni;
        const password = req.body.password;
        const encryptedPassword = bcrypt.hashSync(password, 10);

        if (!name) {
            res.status(400).json({ success: false, message: 'Falta el campo "name"' });
          }
        if (!email) {
            res.status(400).json({ success: false, message: 'Falta el campo "email"' });
        }
        if (!dni) {
            res.status(400).json({ success: false, message: 'Falta el campo "dni"' });
        }
        if (!password) {
            res.status(400).json({ success: false, message: 'Falta el campo "password"' });
        }


      const userCreated = await UserModel.create({ name: name, email: email, dni: dni, password: encryptedPassword});
      res.status(200).json({ success: true, user: userCreated });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al crear el usuario', error: err.message });
    }
  }

  async function getUsers(req, res) {
    try {
      const users = await UserModel.find({});
      res.send(users);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: err.message });
    }
  }

  async function login(req, res){
    try{
      const email = req.body.email;

      if (!email) {
        res.status(400).json({ logged: false, message: 'Falta el campo "email"' });
    }
    
    const user = await UserModel.findOne({ email: email });
    const encryptedPassword = user.password;
    const password = req.body.password;
    const isMatch = await bcrypt.compare(password, encryptedPassword);

    if (isMatch === false ){
        res.status(400).json({ logged: false, message: 'Contraseña incorrecta' });
    } else {
      res.status(200).json({ logged: true, message: 'Contraseña correcta' });
    }
    
    }catch (err) {
      res.status(500).json({ logged: false, message: 'Error de login', error: err.message });
    }
  }



  export { createUser, getUsers, login };