module.exports = app => {
    const usuarios = require("../controllers/usuario.controller.js");

    
  
    // Create a new Customer
    app.post("/api/usuarios", usuarios.create);
  
    // Retrieve all Customers
    app.get("/api/usuarios", usuarios.findAll);
  
    // Retrieve a single Customer with userrId
    app.get("/api/usuarios/:correoElectronico", usuarios.findOne);
  
    // Update a Customer with customerId
    app.put("/api/usuarios/:usuarioId", usuarios.update);
  
    // Delete a Customer with customerId
    app.delete("/api/usuarios/:usuarioId", usuarios.delete);
  
    // Create a new Customer
    app.delete("/usuarios", usuarios.deleteAll);

    
  };