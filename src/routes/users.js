import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {
  const { username, email, password } = req.body.user;
  const user = new User({ username, email });
  user.setPassword(password);
  user.save()
  .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
  .catch(err => {
    res.status(400);
    const usernameErr = err.errors.username;
    const emailErr = err.errors.email;
    if(usernameErr && emailErr) res.json({ errors:{ username: 'This username is already taken', email: 'This email is already taken' } })
    if(usernameErr) res.json({ errors:{ username: 'This username is already taken' } })
    if(emailErr) res.json({ errors:{ email: 'This email is already taken' } })
  })
});

export default router;
