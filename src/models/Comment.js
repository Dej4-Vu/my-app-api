import mongoose from 'mongoose';


var schema = new mongoose.Schema(
  {
  username: {type: String, required: true},
  id: {type: String, required: true},
  comment: {type: String, required: true}
  },
  { timestamps: true }
);

schema.methods.newComment = function newComment() {
  return {
    username: this.username,
    id: this.id,
    comment: this.comment
  };
};

export default mongoose.model('Comment', schema);
