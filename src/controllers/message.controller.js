import MessageModel from "../models/message.model.js";

async function createMessage(req, res) {
    try {
        
        const userId = req.body.userId;
        const message = req.body.message;
        
        if (!userId) {
            res.status(400).json({ success: false, message: 'Falta el campo "userId"' });
          }
        if (!message) {
            res.status(400).json({ success: false, message: 'Falta el campo "message"' });
        }
        
      const messageCreated = await MessageModel.create({ userId: userId, message: message });
      res.status(200).json({ success: true, message: messageCreated});
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error al crear el mensaje', error: err.message });
    }
  }

  async function deleteMessageById(req, res) {
    try {
      const messageId = req.params.messageId;
      const message = await MessageModel.deleteOne({ _id: messageId });
      res.status(204).send({message: message});
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function getMessagesByUserId(req, res) {
    const userId = req.params.userId;
    const messages = await MessageModel.find({ userId: userId});
    res.send({ messages });
  }

  export { createMessage, deleteMessageById, getMessagesByUserId };