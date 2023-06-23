import express from 'express';
import { router as userRouter } from './routes/users.routes.js';
import { router as messageRouter } from './routes/messages.routes.js';
import connect from './configs/mongo.js';

const app = express();

app.use(express.json());

app.use('/messages', messageRouter);
app.use('', userRouter);

app.get('/', function Description(req,res) {
    const student = {
        name : 'Cristóbal Matus'
    }
    res.send({ student })
});

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