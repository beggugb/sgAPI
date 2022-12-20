import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Proceso, Usuario } = database;

class ProcesoService {    
   static add(newProceso) {    
    return new Promise((resolve, reject) => {               
        Proceso.create(newProceso)
            .then((proceso) => {                
                resolve({ Proceso: proceso })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });                    
    });
  }
}

export default ProcesoService;
