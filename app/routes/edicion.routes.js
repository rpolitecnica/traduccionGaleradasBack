module.exports = app => {
    const ediciones = require("../controllers/edicion.controller.js");

    
  
    // Create a new Customer
    app.post("/api/ediciones", ediciones.create);
  
    // Retrieve all Customers
    app.get("/api/ediciones", ediciones.findAll);
  
    // Retrieve a single Customer with userrId
    app.get("/api/ediciones/:id", ediciones.findOne);
  
    // Update a Customer with customerId
    app.put("/api/ediciones/:edicionId", ediciones.update);
  
    // Delete a Customer with customerId
    app.delete("/api/ediciones/:edicionId", ediciones.delete);
  
    // Create a new Customer
    app.delete("/api/ediciones", ediciones.deleteAll);

    
  };