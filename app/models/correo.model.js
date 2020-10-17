const sql = require("./db.js");


const Correo = function(correo) {
    this.asunto = correo.asunto;
    this.mensaje = correo.mensaje;
    this.fecha = correo.fecha;
  };


  Correo.create = (newCorreo, result) => {
    sql.query("INSERT INTO correos SET ?", newCorreo, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newCorreo });
      result(null, { id: res.insertId, ...newCorreo });
    });
  };




  Correo.getAll = result => {
    sql.query("SELECT * FROM correos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };


  Correo.updateById = (id, correo, result) => {
    sql.query(
      "UPDATE correos SET asunto = ?, mensaje = ?, fecha = ? WHERE id = ?",
      [correo.asunto, correo.mensaje, correo.fecha, id],
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
  
        console.log("updated customer: ", { id: id, ...correo });
        result(null, { id: id, ...correo });
      }
    );
  };

  Correo.remove = (id, result) => {
    console.log("id eliminar "+id);
    sql.query("DELETE FROM correos WHERE id = ?", id, (err, res) => {
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
  
  Correo.removeAll = result => {
    sql.query("DELETE FROM correos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  };


  module.exports = Correo;
