const Periodo = require("../models/periodo.model.js");



// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Periodo.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    console.log(req.params);
    Periodo.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found usuario with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving usuario with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

