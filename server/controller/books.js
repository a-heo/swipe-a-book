const axios = require('axios');
const API_KEY = require('../config/bookapi.js');

const getBooks = (req, res) => {
  let genreUrl = '';
  if (req.params.genre === 'juvenile') {
    genreUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:"juvenile+fiction"+inpublisher:"random+house"&orderBy=newest&printType=books&langRestrict=en&maxResults=40&zoom=3&key=${API_KEY}`;
  }
  if (req.params.genre === 'fiction') {
    genreUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:"fiction"+inpublisher:"riverhead"&orderBy=newest&printType=books&langRestrict=en&maxResults=40&key=${API_KEY}`;
  }
  if (req.params.genre === 'graphic') {
    genreUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:"graphic+novels"&orderBy=newest&printType=books&langRestrict=en&maxResults=40&key=${API_KEY}`;
  }
  if (req.params.genre === 'mystery') {
    genreUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:"mystery"&orderBy=newest&printType=books&langRestrict=en&maxResults=40&key=${API_KEY}`;
  }
  if (req.params.genre === 'fantasy') {
    genreUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:"fantasy"&orderBy=newest&printType=books&langRestrict=en&maxResults=40&key=${API_KEY}`;
  }
  if (req.params.genre === 'youngadult') {
    genreUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:"young+adult+fiction"&orderBy=newest&printType=books&langRestrict=en&maxResults=40&key=${API_KEY}`;
  }
  if (req.params.genre === 'asian') {
    genreUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:"asian+americans+fiction"&orderBy=newest&printType=books&langRestrict=en&maxResults=40&key=${API_KEY}`;
  }

  axios.get(genreUrl)
    .then((data) => {
      res.send(data.data.items);
    })
    .catch((error) => {
      console.log('error', error);
      res.status(404);
    });
};

module.exports = { getBooks };
