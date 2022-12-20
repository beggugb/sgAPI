import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { VentaItems } = database;

class VentaItemsService {
   
  static add(data) {    
    return new Promise((resolve, reject) => {        
        VentaItems.bulkCreate(data, {individualHooks: true})  
            .then((result) => {              
                resolve({ message: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              }); 
     });
    }
}

export default VentaItemsService;
