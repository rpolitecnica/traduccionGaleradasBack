const sql = require("./db.js");


const Traduccion = function(traduccion) {
    this.idEdicion = traduccion.idEdicion;
    this.tituloArticulo = traduccion.tituloArticulo;
    this.fechaTraduccion = traduccion.fechaTraduccion;
    this.xmlTraduccion = traduccion.xmlTraduccion;
  };

  Traduccion.getAll = result => {
    sql.query("SELECT t.id,t.idEdicion,t.fechaTraduccion,t.tituloArticulo,t.xmlTraduccion,e.titulo FROM traducciones t inner join ediciones e on t.idEdicion=e.id", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("traducciones: ", res);
      result(null, res);
    });
  };


  Traduccion.remove = (id, result) => {
    console.log("id eliminar "+id);
    sql.query("DELETE FROM traducciones WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  };

  Traduccion.updateById = (id, traduccion, result) => {
    sql.query(
      "UPDATE traducciones SET idEdicion = ? WHERE id = ?",
      [traduccion.idEdicion, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { id: id, ...traduccion });
        result(null, { id: id, ...traduccion });
      }
    );
  };
  module.exports = Traduccion;
