const crypto = require('crypto');
var express = require('express');
var router = express.Router();
const event_model = require('./event_model')

router.get('/', (req, res) => {
    event_model.getEvent(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  router.post('/event', (req, res) => {
    event_model.createEvent(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })
  
  router.delete('/event', (req, res) => {
    event_model.deleteEvent(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  module.exports = router;

