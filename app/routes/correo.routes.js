module.exports = app => {
  const correos = require("../controllers/correo.controller.js");

  

  // Create a new Customer
  app.post("/api/correos", correos.create);

  // Retrieve all Customers
  app.get("/api/correos", correos.findAll);


  // Update a Customer with customerId
  app.put("/api/correos/:correoId", correos.update);

  // Delete a Customer with customerId
  app.delete("/api/correos/:correoId", correos.delete);

  // Create a new Customer
  app.delete("/api/correos", correos.deleteAll);

  
};