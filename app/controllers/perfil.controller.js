const Perfil = require("../models/perfil.model.js");



// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Perfil.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

