import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';

var schema = new mongoose.Schema(
  {
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, lowercase: true, unique: true},
  passwordHash: {type: String, required: true}
  },
  { timestamps: true }
);

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  };
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    username: this.username,
    email: this.email
  }, 'secret');
};

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash)
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
}

schema.plugin(uniqueValidator);

export default mongoose.model('User', schema);
