const Menu = require("../models/menu.model.js");


// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  console.log(req.params);
  Menu.findById(req.params.idPerfil, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found usuario with id ${req.params.idPerfil}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving usuario with id " + req.params.idPerfil
          });
        }
      } else res.send(data);
    });
};


