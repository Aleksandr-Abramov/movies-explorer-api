const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(data) {
        if (isEmail(data)) {
          return true;
        }
        return false;
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = {
  userSchema,
};
