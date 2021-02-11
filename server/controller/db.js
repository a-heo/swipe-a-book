const pool = require('../../db/model/index.js');

const getInfo = (query, callback) => {
  pool
    .query(query)
    .then((res) => {
      callback(res.rows);
    })
    .catch((e) => {
      console.log(e);
    });
};

const addInfo = (query, values, res) => {
  pool
    .query(query, values)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
};

module.exports = {
  getInfo,
  addInfo,
};
