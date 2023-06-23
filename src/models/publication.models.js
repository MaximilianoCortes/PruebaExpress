import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;