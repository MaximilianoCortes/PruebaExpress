import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body_text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false
    },
    likes: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Posts', PostSchema);

export default PostModel;