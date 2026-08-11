const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // never returned in queries by default
    },
    role: {
      type: String,
      enum: ['student', 'mentor', 'admin'],
      default: 'student',
    },
    // Student profile scaffold — expanded later when profile service is built
    profile: {
      board: { type: String, default: '' },          // e.g. CBSE, ICSE, State
      grade: { type: String, default: '' },          // e.g. 10th, 12th
      quizResult: { type: String, default: '' },     // last quiz recommendation
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt automatically
  }
);

// Hash password before saving — only runs if password field was modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Salt rounds: 12 is the standard production choice
  // Higher = slower hash (good for security), lower = faster (bad)
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to compare login password against stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
