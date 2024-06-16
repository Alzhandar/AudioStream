import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  photoUrl: { type: String, required: true }
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
