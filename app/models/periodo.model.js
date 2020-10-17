const sql = require("./db.js");


const Periodo = function(periodo) {
    this.descripcion = periodo.descripcion;
  };


  Periodo.findById = (id, result) => {
    sql.query(`SELECT * FROM periodos WHERE id = '${id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found periodo: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Periodo.getAll = result => {
    sql.query("SELECT * FROM periodos", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

  


  module.exports = Periodo;
