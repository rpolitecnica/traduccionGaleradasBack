module.exports = app => {
  const menu = require("../controllers/menu.controller.js");

  
// Retrieve a single Customer with userrId
app.get("/api/menu/:idPerfil", menu.findOne);

  
};