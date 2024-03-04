const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({

  hall_name: {
    type: String,
    required: true,
  },
  location: {
      type: String,
    required: true,
  },
  number_of_blocks: {
    type: Number,
    required: true,
  },
  blocks: [
    {
      block_letter: {
        type: String,
        required: true,
      },
      number_of_rooms: {
        type: Number,
        required: true,
      },
      rooms: [
        {
          room_number: {
            type: Number,
            required: true,
          },
          students: [{
            type: mongoose.Schema.ObjectId,
            ref: 'studentInfo',
          }]
        }
      ]
    }
  ]


});


const hallModel = mongoose.model('hall', hallSchema);

module.exports = hallModel

