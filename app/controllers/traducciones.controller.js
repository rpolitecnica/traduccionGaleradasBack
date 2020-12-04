const Traduccion = require("../models/traducciones.model.js");



// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Traduccion.getAll((err, data) => {
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
    Traduccion.findById(req.params.id, (err, data) => {
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

// Find a single Customer with a customerId
exports.findEdicionAnio = (req, res) => {
  console.log(req.params);
  Traduccion.findByIdEdicionAnio(req.params.id, (err, data) => {
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



// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Traduccion.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.id
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Traduccion.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};


// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Traduccion.updateById(
    req.params.id,
    new Traduccion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};