const sql = require("./db.js");


const Usuario = function(usuario) {
    this.nombres = usuario.nombres;
    this.primerApellido = usuario.primerApellido;
    this.segundoApellido = usuario.segundoApellido;
    this.correoElectronico = usuario.correoElectronico;
  };


  Usuario.create = (newUser, result) => {
    sql.query("INSERT INTO usuarios SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };


  Usuario.findById = (usuarioId, result) => {
    sql.query(`SELECT * FROM usuarios WHERE id = ${usuarioId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Usuario.getAll = result => {
    sql.query("SELECT * FROM usuarios", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };


 /* Usuario.updateById = (id, customer, result) => {
    sql.query(
      "UPDATE usuarios SET email = ?, name = ?, active = ? WHERE id = ?",
      [customer.email, customer.name, customer.active, id],
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
  
        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    );
  };*/


  module.exports = Usuario;
