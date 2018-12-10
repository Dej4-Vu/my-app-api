import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import auth from './routes/auth';
import users from './routes/users';
import posts from './routes/posts';
import comments from './routes/comments';

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/my-app-db', { useNewUrlParser: true });

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);


app.listen(8080, () => console.log("App is running on localhost:8080"));
