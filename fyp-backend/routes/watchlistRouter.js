const router = require("express").Router();
const auth = require("../middleware/auth");
const WatchlistItem = require("../models/watchlist");

router.post("/add", auth, async (req, res) => {
  try {
    const { title, ticker, domain, status } = req.body;
    const existingWatchlistItem = await WatchlistItem.findOne({
      title: title,
      userId: req.user,
    });
    if (existingWatchlistItem)
      return res
        .status(400)
        .json({ msg: "Company already exists in your watchlist" });
    const newWatchlistItem = new WatchlistItem({
      userId: req.user,
      title,
      ticker,
      domain,
      status,
    });
    const savedWatchlistItem = await newWatchlistItem.save();
    res.json({ msg: "Company Added to Watchlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    const watchlist = await WatchlistItem.find({ userId: req.user });
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/admindelete", async (req, res) => {
  try {
    const { ticker } = req.body;
    const query = { ticker: ticker };
    await WatchlistItem.collection.deleteMany(query);
    res.status(200).json({ msg: "Company Removed from all watchlists" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const watchlistItem = await WatchlistItem.findOne({
      userId: req.user,
      _id: req.params.id,
    });
    if (!watchlistItem) {
      return res.status(400);
    }
    const deletedwatchlistItem = await WatchlistItem.findByIdAndDelete(
      req.params.id
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
