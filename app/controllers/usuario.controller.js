const Usuario = require("../models/usuario.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const usuario = new Usuario({
      nombres: req.body.nombres,
      primerApellido: req.body.primerApellido,
      segundoApellido: req.body.segundoApellido,
      correoElectronico: req.body.correoElectronico,
      idPerfil:req.body.idPerfil,
    });
  
    // Save Customer in the database
    Usuario.create(usuario, (err, data) => {
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
    Usuario.getAll((err, data) => {
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
    Usuario.findById(req.params.correoElectronico, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found usuario with id ${req.params.correoElectronico}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving usuario with id " + req.params.correoElectronico
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

  Usuario.updateById(
    req.params.usuarioId,
    new Usuario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.usuarioId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.usuarioId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Usuario.remove(req.params.usuarioId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.usuarioId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.usuarioId
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Usuario.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};