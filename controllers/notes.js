const notesRouter = require('express').Router();
const Note = require('../models/note');

// notesRouter.get('/', (req, res) => {
//   res.send('<div>Hello world I am Huy Nguyen</div>');
// });

notesRouter.get('/', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

notesRouter.post('/', (req, res) => {
  const { body } = req;
  if (!body.content) {
    return res.status(400).json({ error: 'content missing' });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  return note.save().then((result) => {
    res.json(result);
  });
});

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then((notes) => {
      if (notes) {
        res.json(notes);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      next(err);
    });
});

notesRouter.put('/:id', (req, res, next) => {
  const { body } = req;
  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

module.exports = notesRouter;
