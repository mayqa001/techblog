const router = require('express').Router();
const { Post, Comment } = require('../../model');

// CREATE
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ

// read all
router.get('/', async (req, res) => {
  try {
    const commentData = await comment.findAll();

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// read one
router.get('/:id', async (req, res) => {
  const comment_id = req.params.id;

  try {
    const commentData = await Comment.findByPk();

    if (commentData == null)
      res.status(404).json({ message: "Could not find comment with id: " + comment_id });
    else
      res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const comment_id = req.params.id;

  try {
    const commentData = await Comment.update(req.body, { where: { id: comment_id } });

    if (commentData == null)
      res.status(404).json({ message: "Could not find comment with id: " + comment_id });
    else
      res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const comment_id = req.params.id;

  try {
    const commentData = await Comment.destroy({ where: { id: comment_id } });

    if (commentData == null)
      res.status(404).json({ message: "Could not find comment with id: " + comment_id });
    else
      res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
