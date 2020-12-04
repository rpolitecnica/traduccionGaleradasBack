const Edicion = require("../models/edicion.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  console.log("creacion")
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const edicion = new Edicion({ 
      idUsuario: req.body.idUsuario,
      titulo: req.body.titulo,
      volumen: req.body.volumen,
      numero: req.body.numero,
      idPeriodo: req.body.idPeriodo,
      fechaPublicacion: req.body.fechaPublicacion
    });
  
    // Save Customer in the database
    Edicion.create(edicion, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Edicion.getAll((err, data) => {
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
    Edicion.findById(req.params.id, (err, data) => {
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


exports.findByYear = (req, res) => {
  console.log(req.params);
  console.log("-------------yearrrr-------");
  Edicion.findByIdYear(req.params.id, (err, data) => {
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

exports.findByYearEdicion = (req, res) => {
  console.log(req.params);
  console.log("-------------yearrrr Edicion-------");
  Edicion.findByIdYearEdicion(req.params.id, (err, data) => {
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

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Edicion.updateById(
    req.params.edicionId,
    new Edicion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.edicionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.edicionId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  console.log("eliminacion")
    Edicion.remove(req.params.edicionId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.edicionId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.edicionId
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Edicion.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};