import express from 'express';
import Post from '../models/Post';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', (req, res) => {
  const { username, title, body } = req.body.post;
  const post = new Post({ username, title, body });
  post.save()
  .then(_post => res.json({ post: _post.newPost() }))
});

router.get('/', (req, res) => {
  Post.find({})
  .then(posts => res.json({ posts }))

});

router.delete('/', (req, res) => {
  Post.deleteOne( {"_id": mongoose.Types.ObjectId(req.body.id)} )
  .then(() => res.status(200).json("Post deleted"));
});

export default router;
