import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  // datetime: { type: Date, default: Date.now }, // date and time
  date: String,
  time: String,
  duration: Number, // minutes
  location: [{ type: Schema.Types.ObjectId, ref: 'Court' }],
  players_needed: Number,
  max_players: Number,
  level: Number,
  players_list: [{ type: Schema.Types.ObjectId, ref: 'User' }], // players_list: [{ type: String }],
  postGameEvaluation: [],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
