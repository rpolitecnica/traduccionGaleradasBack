const sql = require("./db.js");


const Traduccion = function(traduccion) {
    this.idEdicion = traduccion.idEdicion;
    this.idUsuario = traduccion.idUsuario;
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

  Traduccion.findById = (id, result) => {
    sql.query(`SELECT t.id,t.idEdicion,t.fechaTraduccion,t.tituloArticulo,t.xmlTraduccion,e.titulo FROM traducciones t inner join ediciones e on t.idEdicion=e.id WHERE t.idUsuario= '${id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Ediciones: ", res[0]);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Traduccion.findByIdEdicionAnio = (id, result) => {
    var ArrayEdicion=id.split("-");
    var idEdicion=ArrayEdicion[0];
    var anio=ArrayEdicion[1];
    sql.query(`SELECT t.id,t.idEdicion,t.fechaTraduccion,t.tituloArticulo,t.xmlTraduccion,e.titulo FROM traducciones t inner join ediciones e on t.idEdicion=e.id WHERE t.idEdicion='${idEdicion}' and YEAR(e.fechaPublicacion)='${anio}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Ediciones: ", res[0]);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
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
     var consulta=`UPDATE traducciones SET idEdicion = '${traduccion.id}' WHERE id ='${id}'`;
    console.log("modificacion ----------"+traduccion);
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
