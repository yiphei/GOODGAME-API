import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const CourtSchema = new Schema({
  title: String,
  lat: Number,
  long: Number,
  game_list: [{ type: Schema.Types.ObjectId, ref: 'Court' }], // players_list: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// create PostModel class from schema
const CourtModel = mongoose.model('Court', CourtSchema);

export default CourtModel;
