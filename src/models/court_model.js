import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const CourtSchema = new Schema({
  // datetime: { type: Date, default: Date.now }, // date and time
  title: String,
  lat: Number,
  long: Number,
  game_list: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // players_list: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// create PostModel class from schema
const CourtModel = mongoose.model('Court', CourtSchema);

export default CourtModel;
