const mongoose = require('mongoose');
const { OK, NOT_FOUND } = require('../../constants/answer-codes');
const noteSchema = require('../../../schemas/note.schema');

const Note = mongoose.model('Note', noteSchema);

module.exports = (request, response) => {
  const { limit = 10, skip = 0 } = request.query;
  const { keyword } = request.params;

  const action = Note.find({ 'keywords.title': keyword }).skip(Number(skip)).limit(Number(limit));

  action
    .then(notes => {
      if (notes.length) {
        return response.status(200).json({
          status: OK,
          result: {
            notes,
            length: notes.length,
          },
        });
      }

      return Promise.reject(NOT_FOUND);
    })
    .catch(error => {
      response.status(500).json({ status: error.errors || error });
    });
};