module.exports = app => {
    const traducciones = require("../controllers/traducciones.controller.js");

    
  
    
  
    // Retrieve all Customers
    app.get("/api/traducciones", traducciones.findAll);
  
    // Retrieve a single Customer with userrId
    app.get("/api/traducciones/:id", traducciones.findOne);
  
  
    // Delete a Customer with customerId
    app.delete("/api/traducciones/:id", traducciones.delete);

    app.put("/api/traducciones/:id", traducciones.update);
  
    // Create a new Customer
    app.delete("/traducciones", traducciones.deleteAll);

    
  };