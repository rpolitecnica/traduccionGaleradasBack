module.exports = app => {
  const perfil = require("../controllers/perfil.controller.js");

  
// Retrieve a single Customer with userrId
app.get("/api/perfiles/", perfil.findAll);

  
};