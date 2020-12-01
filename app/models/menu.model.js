const sql = require("./db.js");


const Menu = function(menu) {
    this.idPerfil = menu.idPerfil;
    this.modulo = menu.modulo;
    this.ruta=menu.ruta;
    this.icono=menu.icono;
    this.componente=menu.componente;
  };







  Menu.findById = (idPerfil, result) => {
    sql.query(`SELECT * FROM menu WHERE idPerfil = '${idPerfil}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  module.exports = Menu;
