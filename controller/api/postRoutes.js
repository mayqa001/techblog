const router = require('express').Router();
const { Post, Comment } = require('../../model');

// CREATE
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create(req.body);

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ

// read all
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: Comment,
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// read one
router.get('/:id', async (req, res) => {
  const post_id = req.params.id;

  try {
    const postData = await Post.findByPk({
      include: Comment,
    });

    if (postData == null)
      res.status(404).json({ message: "Could not find post with id: " + post_id });
    else
      res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const post_id = req.params.id;

  try {
    const postData = await Post.update(req.body, { where: { id: post_id } });

    if (postData == null)
      res.status(404).json({ message: "Could not find post with id: " + post_id });
    else
      res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const post_id = req.params.id;

  try {
    const postData = await Post.destroy({ where: { id: post_id } });

    if (postData == null)
      res.status(404).json({ message: "Could not find post with id: " + post_id });
    else
      res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
