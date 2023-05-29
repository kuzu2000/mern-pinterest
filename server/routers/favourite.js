const express = require('express')
const router = express.Router()
const Favourite = require('./../models/favourite')
const {verifyToken, verifyTokenAndAuthorization} = require('./../middleware/auth')
const User = require('./../models/user');

router.post('/favourited', verifyToken, (req, res) => {

    // Find Favorite Information inside Favorite Collection by Movie Id , userFrom 
    Favourite.find({ "postId": req.body.postId, "userId": req.body.userId })
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)

            //How can we know if I already favorite this movie or not ? 
            let result = false;
            if (favorite.length !== 0) {
                result = true
            }

            res.status(200).json(result);

        })

});

router.post('/addToFavourite/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

     const user = await User.findById(id)
    const index = user.favourites.findIndex((id) => String(id) === String(req.body.postId));

    if (index === -1) {
        user.favourites.push(req.body.postId);
    } else {
      user.favourites = user.favourites.filter(
        (id) => String(id) !== String(req.body.postId)
      );
    }
    const updatedPost = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json(updatedPost);
})

    // try {
    //   const user = await User.findById(id)
    //   if (!user.favourites.includes(req.body)) {
    //     await user.updateOne({ $push: { favourites: req.body } });
    //     res.status(200).json('Post Favourited ');
    //   } else {
    //     await user.updateOne({ $pull: { favourites: req.body } });
    //     res.status(200).json('Post Unfavourited');
    //   }
    // } catch (error) {
    //   res.status(500).json(error.message);
    // }

router.post('/removeFromFavourite', verifyToken, async (req, res) => {
    const favourited = await Favourite.find({ "postId": req.body.postId, "userId": req.body.userId })
    if(favourited.length > 0) {
        Favourite.findOneAndDelete({ "postId": req.body.postId, "userId": req.body.userId })
    } else {
        Favourite.create({ "postId": req.body.postId, "userId": req.body.userId })
    }
})

router.get('/getFavourites', verifyToken, (req, res) => {
    Favourite.find({'userId': req.user.id}).exec((err, favorites) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json(favorites)
    })
})




module.exports = router