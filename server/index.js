const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const controller = require('./controller/index.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

// get book info
app.get('/api/books/:genre', controller.books.getBooks);

// get user id
app.get('/api/user', (req, res) => {
  const { user } = req.query;
  const { pw } = req.query;
  const query = `SELECT id FROM USERS WHERE users.username = '${user}' and users.pw = '${pw}' `;
  controller.db.getInfo(query, (result) => {
    res.send(result);
  });
});

// get book info for specific user
app.get('/api/user/books', (req, res) => {
  const { user } = req.query;
  const { pw } = req.query;
  const query = `SELECT * FROM userbooks FULL JOIN users on users.id = userbooks.userid WHERE users.username = '${user}' and users.pw = '${pw}' and userbooks.liked = 't'`;
  controller.db.getInfo(query, (result) => {
    res.send(result);
  });
});

// make new user info
app.post('/api/user/new', (req, res) => {
  const query = 'INSERT INTO users (username, pw, zipcode, email) values ($1, $2, $3, $4)';
  const values = [req.body.user, req.body.pw, req.body.zipcode, req.body.email];
  controller.db.addInfo(query, values, res);
});

// put book info for specific user
app.post('/api/:id/books/storeInfo', (req, res) => {
  const { id } = req.params;
  const query = 'INSERT INTO userbooks (userid, isbn, title, author, published, description, image, liked) values ($1, $2, $3, $4, $5, $6, $7, $8) on conflict (userid, isbn) do update set liked = EXCLUDED.liked';
  const values = [
    id,
    req.body.ibsn,
    req.body.title,
    req.body.author,
    req.body.published,
    req.body.description,
    req.body.image,
    req.body.liked,
  ];
  controller.db.addInfo(query, values, res);
});

app.listen(port, () => {
  console.log(`you are listening in on port ${port}`);
});
