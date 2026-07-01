const mongoose = require('mongoose');

const partidoSchema = new mongoose.Schema({
  date: { type: String },
  home_team: { type: String },
  away_team: { type: String },
  home_score: { type: Number },
  away_score: { type: Number },
  tournament: { type: String },
  city: { type: String },
  country: { type: String },
  neutral: { type: Boolean }
});

const Partido = mongoose.model('Partido', partidoSchema);

module.exports = Partido;