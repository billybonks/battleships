'use strict';

let answer = null;

module.exports = function(app) {
  const express = require('express');
  let answersRouter = express.Router();

  answersRouter.get('/', function(req, res) {
    res.send({
      'answers': []
    });
  });

  answersRouter.post('/', function(req, res) {
    answer = req.body;
    res.status(201).end();
  });

  answersRouter.get('/:id', function(req, res) {
    res.send({
      'answer': answer
    });
  });

  answersRouter.put('/:id', function(req, res) {
    res.send({
      'answers': {
        id: req.params.id
      }
    });
  });

  answersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/answers', require('body-parser').json());
  app.use('/api/answers', answersRouter);
};
