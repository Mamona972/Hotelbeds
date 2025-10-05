const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();

const API_KEY = "f668c0249adbab91f9392d3aff832c99";
const SECRET = "57d951156d";
const HOTELS_SEARCH_URL = "https://api.test.hotelbeds.com/hotel-api/1.0/hotels";

app.get('/hotels', async (req, res) => {
  try {
    const destinationCode = req.query.destinationCode; //LON , PAR , NYC

    if (!destinationCode) {
      return res.status(400).json({ error: "Please provide ?destinationCode=XYZ" });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const payload = API_KEY + SECRET + timestamp;
    const signature = crypto.createHash('sha256').update(payload).digest('hex');

    
    const headers = {
      "Api-Key": API_KEY,
      "X-Signature": signature,
      "Accept": "application/json",
      "Content-Type": "application/json"
    };

    
    const body = {
      stay: {
        checkIn: "2025-10-10",
        checkOut: "2025-10-12"
      },
      occupancies: [
        { rooms: 1, adults: 2, children: 0 }
      ],
      destination: {
        code: destinationCode,
        type: "SIMPLE"
      }
    };

    
    const response = await axios.post(HOTELS_SEARCH_URL, body, { headers });

    
    res.json({
      destination: destinationCode,
      hotels: response.data.hotels || "No hotels found"
    });

  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
