import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {
  const { data } = req.body;
  User.findOne({ username: data.username, email: data.email})
  .then(user => {
    if(user && user.isValidPassword(data.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
});


export default router;
