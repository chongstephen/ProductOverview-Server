const models = require('./models');

module.exports = {

  get: (req, res) => {
    models.getAll()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  getOne: (req, res) => {
    models.getOne(req.params.product_id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  getStyles: (req, res) => {
    models.getStyles(req.params.product_id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  getRelated: (req, res) => {
    models.getRelated(req.params.product_id)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};