'use strict';

let offer = null;

module.exports = function(app) {
  const express = require('express');
  let gamesRouter = express.Router();

  gamesRouter.get('/', function(req, res) {
    res.send({
      'games': []
    });
  });

  gamesRouter.post('/', function(req, res) {
    offer = req.body;
    res.status(201).end();
  });

  gamesRouter.get('/:id', function(req, res) {
    res.send({
      'offer': offer
    });
  });

  gamesRouter.put('/:id', function(req, res) {
    res.send({
      'games': {
        id: req.params.id
      }
    });
  });

  gamesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/games', require('body-parser').json());
  app.use('/api/games', gamesRouter);
};
