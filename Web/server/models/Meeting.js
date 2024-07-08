import mongoose from 'mongoose';
const { Schema } = mongoose;

const MeetingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Meeting', MeetingSchema);
