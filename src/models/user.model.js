import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:false
    },
    roles: {
      type: Array,
    } 
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;