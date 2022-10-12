const mestodb = require('mongoose')


const cardSchema = new mestodb.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link:{
    type: String,
    required: true,
  },
  owner:{
    type: mestodb.Schema.Types.ObjectId,
    required: true,
  },
  likes: [{
    type: mestodb.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt:{
    type: Date,
    default: Date.now(),
  },
})

module.exports = mestodb.model('card', cardSchema)