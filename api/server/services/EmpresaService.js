import database from "../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Empresa } = database;

class EmpresaService {
    
 static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Empresa.update(dato, { where: { id: Number(datoId) } })
        .then((empresa) => resolve(empresa))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Empresa.findByPk(datoId)
        .then((empresa) => resolve(empresa))
        .catch((reason) => reject(reason));
    });
  }
 
}

export default EmpresaService;
