const express = require('express');
const router = express.Router();
const axios = require('axios');
router.get('/', function(req, res, next) {
  res.render('spotify', { title: 'Spotify', authenticated: false });
});
router.get('/search', function(req, res, next) {
  const query = 'grindin'//req.query.q;
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
  axios.get(url, {
    headers: {
      'Authorization': 'Bearer ' + 'BQCdKz177OVBKYA5kfim52Erode_1ObbZo8d--NiCExX1Q5OLSUBIk3ASD0MegEKy7Kyzq4wZsCs_N6lh3VV7EW0Q5CwSytKVSOEiJek0Rb3TBlW7NoJciJm0D3dvADp9KmixEyeOA4'
    }
  })
    .then(response => {
      res.json(response.data.tracks);
    })
    .catch(error => {
      res.json({ error: error });
    });
});
module.exports = router;