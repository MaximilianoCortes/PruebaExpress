import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    report_reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReportModel = mongoose.model('Report', reportSchema);

export default ReportModel;