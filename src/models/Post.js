import mongoose from 'mongoose';


var schema = new mongoose.Schema(
  {
  username: {type: String, required: true},
  title: {type: String, required: true},
  body: {type: String, required: true}
  },
  { timestamps: true }
);

schema.methods.newPost = function newPost() {
  return {
    username: this.username,
    title: this.title,
    body: this.body
  };
};

export default mongoose.model('Post', schema);
