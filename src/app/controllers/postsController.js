const express = require('express');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const multerConfig = require('../../config/multer');


const router = express.Router();

const Post = require('../models/Posts');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    const posts = await Post.find();

    return res.json(posts);
})

router.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
   console.log(req.file);

   const {originalname: name, size, key, location: url = ''} = req.file;

   const post = await Post.create({
    name: name,
    size: size,
    key: key,
    url: url,
    user: req.userId,
   });

    return res.json({post});
});

router.delete("/posts/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
  });


module.exports = app => app.use('/posts', router);
