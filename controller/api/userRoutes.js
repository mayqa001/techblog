const router = require('express').Router();
const { User } = require('../../model');

// CREATE
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ

// read all
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// read one
router.get('/:id', async (req, res) => {
  const user_id = req.params.id;

  try {
    const userData = await User.findByPk(user_id);

    if(userData == null) 
      res.status(404).json({message: "Could not find user with id: " + user_id});
    else 
      res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const user_id = req.params.id;

  try {
    const userData = await User.update(req.body, { where: { id: user_id }});

    if(userData == null)
      res.status(404).json({message: "Could not find user with id: " + user_id});
    else
      res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const user_id = req.params.id;

  try {
    const userData = await User.destroy({ where: { id: user_id } });

    if (userData == null)
      res.status(404).json({ message: "Could not find user with id: " + user_id });
    else
      res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
