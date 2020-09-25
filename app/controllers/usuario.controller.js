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
      correoElectronico: req.body.correoElectronico
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
  
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  
};