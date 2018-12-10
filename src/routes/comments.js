import express from 'express';
import Comment from '../models/Comment';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', (req, res) => {
  const { username, id, comment } = req.body.comment;
  const commentary = new Comment({ username, id, comment });
  commentary.save()
  .then(Comment.find({}).sort({$natural:-1}).limit(1))
  .then(schema => res.json({ comment: schema }))
});

router.get('/', (req, res) => {
  Comment.find({})
  .then(comments => res.json({ comments }))

});

router.delete('/', (req, res) => {
  const { _id, id } = req.body;
  if(_id) {
    Comment.deleteOne( {"_id": mongoose.Types.ObjectId(req.body._id)} )
    .then(() => res.status(200).json("Comment deleted"));
  }

  if(id) {
    Comment.deleteMany( {"id": req.body.id} )
    .then(() => res.status(200));
  }
});

export default router;
