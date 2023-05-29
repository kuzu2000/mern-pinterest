const router = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { verifyTokenAndAuthorization } = require('./../middleware/auth')
const secret = 'secret';
//REGISTER
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign(
      { username: result.username, email: result.email, id: result._id },
      secret,
      { expiresIn: '7d' }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign(
      { username: oldUser.username, email: oldUser.email, id: oldUser._id, photo: oldUser.photo },
      secret,
      { expiresIn: '7d' }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/get/:id', verifyTokenAndAuthorization, async (req, res) => {
  const {id} = req.params
  const user = await User.findById(id).select('-password').populate('favourites')
  res.status(200).json(user);
})

router.patch(
  '/update/:id',
  verifyTokenAndAuthorization ,async (req, res) => {
    const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    user.username = req.body.username;
  }

  if(req.body.photo) {
    user.photo = req.body.photo
  }

  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 12);
  }

  const updatedUser = await user.save({validateBeforeSave: false});

  const created = {
    username: updatedUser.username,
    email: updatedUser.email,
    photo: updatedUser.photo,
    _id: updatedUser._id,
  };

  const token = jwt.sign({
    username: updatedUser.username,
    password: updatedUser.password,
    email: updatedUser.email,
    id: updatedUser._id,
  }, secret, { expiresIn: '7d' });

  res.status(201).json({ result: created, token });
  })


module.exports = router;
