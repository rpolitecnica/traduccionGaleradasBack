const sql = require("./db.js");


const Edicion = function(edicion) {
    this.idUsuario = edicion.idUsuario;
    this.titulo = edicion.titulo;
    this.volumen = edicion.volumen;
    this.numero = edicion.numero;
    this.idPeriodo = edicion.idPeriodo;
    this.fechaPublicacion = edicion.fechaPublicacion;
  };


  Edicion.create = (newEdicion, result) => {
    sql.query("INSERT INTO ediciones SET ?", newEdicion, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newEdicion });
      result(null, { id: res.insertId, ...newEdicion });
    });
  };


  Edicion.findById = (id, result) => {
    sql.query(`SELECT * FROM ediciones WHERE idUsuario = '${id}'`, (err, res) => {
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


  Edicion.findByIdYear = (id, result) => {
    sql.query(`select e.id,e.idUsuario,e.titulo,e.volumen,e.numero,e.idPeriodo,YEAR(e.fechaPublicacion) as fechaPublicacion,e.estado,p.descripcion, MONTHNAME(e.fechaPublicacion) as mesPublicacion from ediciones e INNER JOIN periodos p on p.id=e.idPeriodo WHERE idUsuario= '${id}' group by YEAR(fechaPublicacion)`, (err, res) => {
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

  Edicion.findByIdYearEdicion = (id, result) => {
    var array=id.split("-");
    var idUsuario=array[0];
    var anio=array[1];
    console.log("Year by edicion"+idUsuario+"-"+anio);
    var sqlli="select e.id,e.idUsuario,e.titulo,e.volumen,e.numero,e.idPeriodo,YEAR(e.fechaPublicacion) as fechaPublicacion,e.estado,p.descripcion, MONTHNAME(e.fechaPublicacion) as mesPublicacion from ediciones e INNER JOIN periodos p on p.id=e.idPeriodo WHERE idUsuario= '"+idUsuario+"' and YEAR(fechaPublicacion)='"+anio+"'";
    console.log(sqlli);
    sql.query(`select e.id,e.idUsuario,e.titulo,e.volumen,e.numero,e.idPeriodo,YEAR(e.fechaPublicacion) as fechaPublicacion,e.estado,p.descripcion, MONTHNAME(e.fechaPublicacion) as mesPublicacion from ediciones e INNER JOIN periodos p on p.id=e.idPeriodo WHERE idUsuario= '${idUsuario}' and YEAR(fechaPublicacion)='${anio}'`, (err, res) => {
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


  

  

  Edicion.getAll = result => {
    sql.query("SELECT e.id as idEdicion,e.titulo,e.volumen,e.numero,p.id,p.descripcion,e.fechaPublicacion,e.idPeriodo FROM ediciones e INNER JOIN periodos p on p.id=e.idPeriodo", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

  Edicion.remove = (id, result) => {
    sql.query("DELETE FROM ediciones WHERE id = ?", id, (err, res) => {
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

 Edicion.updateById = (id, edicion, result) => {
    sql.query(
      "UPDATE ediciones SET titulo = ?, volumen = ?, numero = ? , idPeriodo=? , fechaPublicacion=? WHERE id = ?",
      [edicion.titulo, edicion.volumen, edicion.numero,edicion.idPeriodo,edicion.fechaPublicacion, id],
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
  
        console.log("updated customer: ", { id: id, ...edicion });
        result(null, { id: id, ...edicion });
      }
    );
  };


  module.exports = Edicion;
