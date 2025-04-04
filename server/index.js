const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = 5000;
const API_KEY = process.env.CURRENCY_LAYER_KEY;

app.get("/api/rate", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.currencylayer.com/live?access_key=${API_KEY}&currencies=DOP`
    );
    if (data.success) {
      res.json({ rate: data.quotes.USDDOP });
    } else {
      res.status(400).json({ error: data.error });
    }
  } catch (err) {
    res.status(500).json({ error: "Currency API request failed" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
