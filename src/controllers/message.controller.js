import MessageModel from "../models/message.model.js";

async function createMessage(req, res) {
    try {
        
        const userId = req.body.userId;
        const message = req.body.message;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Falta el campo userId' });
          }
        if (!message) {
            return res.status(400).json({ success: false, message: 'Falta el campo message' });
        }
        
      const messageCreated = await MessageModel.create({ userId: userId, message: message });
      return res.status(200).json({ success: true, message: messageCreated});
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error al crear el mensaje', error: err.message });
    }
  }

  async function deleteMessageById(req, res) {
    try {
      const messageId = req.params.messageId;
      const message = await MessageModel.deleteOne({ _id: messageId });
      return res.status(204).send({message: message});
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async function getMessagesByUserId(req, res) {
    const userId = req.params.userId;
    const messages = await MessageModel.find({ userId: userId});
    return res.send({ messages });
  }

  export { createMessage, deleteMessageById, getMessagesByUserId };