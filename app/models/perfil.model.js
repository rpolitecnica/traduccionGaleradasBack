const sql = require("./db.js");


const Perfil = function(perfil) {
    this.id = perfil.id;
    this.descripcion = perfil.descripcion;
  };





  Perfil.getAll = result => {
    sql.query("SELECT * FROM perfiles ", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

  module.exports = Perfil;
