const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to generate JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Method to validate credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await mongoose.model('User').findOne({ email });
  if (!user) throw new Error('Invalid login');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid login');
  return user;
};

module.exports = mongoose.model('User', userSchema);
