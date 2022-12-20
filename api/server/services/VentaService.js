import database from "../src/models";
import moment from 'moment'
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Venta } = database;

class VentaService {  

  static add(newNota) {    
    return new Promise((resolve, reject) => {                
        Venta.create(newNota,
          {raw: true,nest: true})
            .then((result) => { 
              resolve({ Venta: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
            });           
        
   });
  } 
static getItem(datoId) {    
  return new Promise((resolve, reject) => {
    Venta.findOne({
      raw: true,
      nest: true,
      where: { id: datoId } 
    })
      .then((venta) => resolve(venta))
      .catch((reason) => reject(reason));
  });
}
 

}

export default VentaService;
