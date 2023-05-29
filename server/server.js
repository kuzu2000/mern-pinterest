const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const PostRoute = require('./routers/post')
const UserRoute = require('./routers/user')
const FavouriteRoute = require('./routers/favourite')
app.use(express.json());
app.use(cors({
  origin: '*'}));
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(err));

app.use('/api/posts', PostRoute)
app.use('/api/auth', UserRoute)
app.use('/api/favourite', FavouriteRoute)

app.listen(5000, () => console.log('app is running'));
