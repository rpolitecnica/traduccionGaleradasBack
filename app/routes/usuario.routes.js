module.exports = app => {
    const usuarios = require("../controllers/usuario.controller.js");

    
  
    // Create a new user
    app.post("/api/usuarios", usuarios.create);
  
    // Retrieve all user
    app.get("/api/usuarios", usuarios.findAll);
  
    // Retrieve a single Customer with userrId
    app.get("/api/usuarios/:correoElectronico", usuarios.findOne);
  
    // Update a user with userid
    app.put("/api/usuarios/:usuarioId", usuarios.update);
  
    // Delete a user with userid
    app.delete("/api/usuarios/:usuarioId", usuarios.delete);
  
    // Create a new user
    app.delete("/usuarios", usuarios.deleteAll);

    
  };