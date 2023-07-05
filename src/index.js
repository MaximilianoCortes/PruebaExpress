import express from 'express';
import { router as userRouter } from './routes/users.routes.js';
import { router as postRouter } from './routes/posts.routes.js';
import { router as reportRouter } from './routes/report.routes.js';
import connect from './configs/mongo.js';

const app = express();

app.use(express.json());

app.use('', postRouter);
app.use('', userRouter);
app.use('',reportRouter)

console.log('Connecting to database...');
connect()
  .then(() => {
    console.log('Mongo connected successful');
    app.listen(3000, async () => {
      console.log(`Server is running on PORT: 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });