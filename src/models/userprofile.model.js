import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,

    },
    picture: {
        type: String,

    },
    banner: {
        type: String,
    },
  },
  { timestamps: true }
);

const UserProfileModel = mongoose.model('UserProfile', userProfileSchema);

export default UserProfileModel;