'use strict';
const Rooms = require('../rooms');
module.exports = function(app) {
  const express = require('express');
  let roomRouter = express.Router();

  roomRouter.get('/', function(req, res) {
    res.send({
      'room': Rooms.findOrCreateRoom(req.body.id)
    });
  });

  roomRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  roomRouter.get('/:id', function(req, res) {
    res.send({
      'room': {
        id: req.params.id
      }
    });
  });

  roomRouter.put('/:id', function(req, res) {
    res.send({
      'room': {
        id: req.params.id
      }
    });
  });

  roomRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/room', require('body-parser').json());
  app.use('/api/room', roomRouter);
};
