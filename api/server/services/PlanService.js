import database from "../src/models";
import moment from 'moment'
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Plan, Usuario } = database;

class PlanService {   

  static add(data) {    
    return new Promise((resolve, reject) => {        
        Plan.bulkCreate(data, {individualHooks: true})  
            .then((result) => {              
                resolve({ message: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              }); 
     });
    }

  static data(notaId) {
    return new Promise((resolve, reject)=>{             
        Plan.findAll({
            raw:true,
            nest:true,            
            order: [['id','asc']],            
            where:{ notaId: notaId}
        })        
        .then((rows)=> resolve(rows))
        .catch((reason)=> reject({message: reason.message}))
    })
}	
        
    static getAll(notaId) {        
      return new Promise((resolve, reject) => {        
          Plan.findAll({
              order: [['id', 'DESC']],            
              where: { notaId: notaId }              
          })
          .then((planes) => {                
                  resolve({ plan: planes })
              })
          .catch((reason) => {                
                  reject({ message: reason.message, data: null })
           });
         });
     }

    static update(dato, datoId) {
      return new Promise((resolve, reject) => {
        Plan.update(dato, { where: { id: Number(datoId) } })
          .then((plan) => resolve(plan))
          .catch((reason) => reject(reason));
      });
    }

    static adds(dato) {
      return new Promise((resolve, reject) => {
        Plan.create(dato)
          .then((plan) => resolve(plan))
          .catch((reason) => reject(reason));
      });
    }

    static delete(datoId) {
    return new Promise((resolve, reject) => {
        Plan.destroy({ where: { notaId: Number(datoId) } })
        .then((plan) => resolve(plan))
        .catch((reason) => reject(reason));
    });
  }
	

  
}

export default PlanService;
