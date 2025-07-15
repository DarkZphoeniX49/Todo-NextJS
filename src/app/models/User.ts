import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);