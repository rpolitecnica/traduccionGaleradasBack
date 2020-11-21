const sql = require("./db.js");


const Traduccion = function(traduccion) {
    this.idEdicion = traduccion.idEdicion;
    this.fechaTraduccion = traduccion.fechaTraduccion;
    this.xmlTraduccion = traduccion.xmlTraduccion;
  };

  Traduccion.getAll = result => {
    sql.query("SELECT * FROM traducciones", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("traducciones: ", res);
      result(null, res);
    });
  };

  module.exports = Traduccion;
