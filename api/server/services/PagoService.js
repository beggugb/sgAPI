import database from "../src/models";
import moment from 'moment'
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Pago, Usuario } = database;

class PagoService {   

  static add(newPago) {    
    return new Promise((resolve, reject) => {        
        Pago.create(newPago,{
          raw: true,
            nest: true
        })
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
        
   });
  } 


  static total(desde,hasta) {    
    return new Promise((resolve, reject) => {        
        Pago.findAll({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('sum', Sequelize.col('pagoTotal')), 'total']
          ],
          where :  { fechaPago: {[Op.between]: [desde, hasta]}}
        })           
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }

  static item(datoId) {    
    return new Promise((resolve, reject) => {
      Pago.findOne({
        raw: true,
        nest: true,
        where: { id: datoId } 
      })
        .then((pago) => resolve(pago))
        .catch((reason) => reject(reason));
    });
  }

  static totalDetalle(desde,hasta) {
    return new Promise((resolve, reject) => {       
       Pago.findAndCountAll({
         raw: true,
         nest: true,         
         where :  { fechaPago: {[Op.between]: [desde, hasta]}},   
         order: [['fechaPago', 'DESC']],
             
       })
         .then((pagos) =>
           resolve({             
             total: pagos.count,
             data: pagos.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }	

  
}

export default PagoService;
