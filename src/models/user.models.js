import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profileImage: { type: String },
  bio: { type: String },
  phone: { type: String },
  isAdmin: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: true },
  provider: { type: String }, // for OAuth providers
  socialId: { type: String }  // for OAuth providers
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model('User', userSchema);
