const sql = require("./db.js");


const Usuario = function(usuario) {
    this.nombres = usuario.nombres;
    this.primerApellido = usuario.primerApellido;
    this.segundoApellido = usuario.segundoApellido;
    this.correoElectronico = usuario.correoElectronico;
    this.idPerfil = usuario.idPerfil;
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


  Usuario.findById = (correoElectronico, result) => {
    sql.query(`SELECT * FROM usuarios WHERE correoElectronico = '${correoElectronico}'`, (err, res) => {
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
    sql.query("SELECT u.id,u.nombres,u.primerApellido,u.segundoApellido,u.correoElectronico,u.idPerfil,p.descripcion as perfil FROM usuarios u INNER JOIN perfiles p on p.id=u.idPerfil  ", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };


  Usuario.updateById = (id, usuario, result) => {
    sql.query(
      "UPDATE usuarios SET nombres = ?, primerApellido = ?, segundoApellido = ?, correoElectronico=?, idPerfil=? WHERE id = ?",
      [usuario.nombres, usuario.primerApellido, usuario.segundoApellido,usuario.correoElectronico,usuario.idPerfil, id],
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
  
        console.log("updated customer: ", { id: id, ...usuario });
        result(null, { id: id, ...usuario });
      }
    );
  };

  Usuario.remove = (id, result) => {
    console.log("id eliminar "+id);
    sql.query("DELETE FROM usuarios WHERE id = ?", id, (err, res) => {
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
  
  Usuario.removeAll = result => {
    sql.query("DELETE FROM usuarios", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  };


  module.exports = Usuario;
