import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Registro, Cliente } = database;

class RegistroService {
    
    static getItem(cliId) {  
        console.log('------------')  
        console.log(cliId)  
        console.log('------------')  
        return new Promise((resolve, reject) => {
          Registro.findOne({
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']],
            limit:1,        
            where : { clienteId: cliId }
          })
            .then((cliente) => resolve(cliente))
            .catch((reason) => reject(reason));
        });
      }
  
   static add(newPaquete) {    
    return new Promise((resolve, reject) => {               
        Registro.create(newPaquete)
            .then((registro) => {                
                resolve({ Registro: registro })
            })
            .catch((reason) => {                
                reject({ message: reason.message, paquete: null })
              });            
        
   });
  } 
  
   static reporte(desde, hasta) {
    return new Promise((resolve, reject) => {
      Registro.findAndCountAll({
        raw: true,
        nest: true,
	      limit: 400,      
        where: {registro: {[Op.between]: [desde, hasta]}},
        include: [
            { model: Cliente, 
	      attributes: ["id", "nombres"],
	    }
        ],
	    order: [['registro','DESC']]      
      })
        .then((clientes) =>
        resolve({
          total: clientes.count,
          data: clientes.rows,
        })
        )
        .catch((reason) => reject(reason));
    });
 }	
  
}

export default RegistroService;
