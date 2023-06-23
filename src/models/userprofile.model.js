import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    picture: {
        type: String,
        required: false,
    },
    banner: {
        type: String,
        required: false,
    },
  },
  { timestamps: true }
);

const UserProfileModel = mongoose.model('UserProfile', userProfileSchema);

export default UserProfileModel;