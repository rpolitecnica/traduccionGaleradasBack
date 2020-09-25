module.exports = app => {
    const usuarios = require("../controllers/usuario.controller.js");
  
    // Create a new Customer
    app.post("/usuarios", usuarios.create);
  
    // Retrieve all Customers
    app.get("/usuarios", usuarios.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/usuarios/:customerId", usuarios.findOne);
  
    // Update a Customer with customerId
    app.put("/usuarios/:customerId", usuarios.update);
  
    // Delete a Customer with customerId
    app.delete("/usuarios/:customerId", usuarios.delete);
  
    // Create a new Customer
    app.delete("/usuarios", usuarios.deleteAll);
  };