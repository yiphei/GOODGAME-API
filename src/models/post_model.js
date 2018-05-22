import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  date: String, // date: { type: Date, default: Date.now },
  time: String,
  duration: Number, // minutes
  lat: Number,
  long: Number,
  players_needed: Number,
  max_players: Number,
  level: Number,
  players_list: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
