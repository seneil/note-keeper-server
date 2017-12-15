const mongoose = require('mongoose');
const { OK, NOT_FOUND } = require('../../constants/answer-codes');
const noteSchema = require('../../../schemas/note.schema');

const Note = mongoose.model('Note', noteSchema);

module.exports = (request, response) => {
  const { name } = request.params;

  const action = Note.findOne({ name });

  action
    .then(note => {
      if (note) {
        return response.status(200).json({
          status: OK,
          result: { note },
        });
      }

      return Promise.reject(NOT_FOUND);
    })
    .catch(error => {
      response.status(500).json({ status: error.errors || error });
    });
};
