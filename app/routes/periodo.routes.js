module.exports = app => {
    const periodos = require("../controllers/periodo.controller.js");

    
  
    
    // Retrieve all Customers
    app.get("/api/periodos", periodos.findAll);
  
    // Retrieve a single Customer with userrId
    app.get("/api/periodos/:id", periodos.findOne);
  


    
  };