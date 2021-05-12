const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String },
  ticker: { type: String },
  domain: { type: String },
  status: { type: Boolean },
});

module.exports = WatchlistItem = mongoose.model("watchlists", watchlistSchema);
