import database from "../src/models";
import moment from 'moment'
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Nota, Usuario } = database;

class NotaService {  

  static getAll(usuarioId, start, end) {        
    return new Promise((resolve, reject) => {        
        Nota.findAll({
            order: [['start', 'DESC']],            
            where: {
              [Op.and]: [            
                { usuarioId: { [Op.eq]: usuarioId } },                    
                { start: {[Op.between]: [start, end ]}},
              ]
            },    
        })
        .then((tareas) => {                
                resolve({ message: "Lista tareas", data: tareas })
            })
        .catch((reason) => {                
                reject({ message: reason.message, data: null })
         });
       });
   }

  static create(newNota) {    
    return new Promise((resolve, reject) => {                
        Nota.create(newNota,
          {raw: true,nest: true})
          .then((row)=> resolve( row )) 
          .catch((reason) => {                
             reject({ message: reason.message })
          });           
        
   });
  } 

  static add(newNota) {    
    return new Promise((resolve, reject) => {                
        Nota.create(newNota,
          {raw: true,nest: true})
            .then((result) => { 
              resolve({ Nota: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
            });           
        
   });
  } 

  static update(newNota,datoId) {    
    return new Promise((resolve, reject) => {        
      Nota.update(newNota, { where: { id: Number(datoId) } })
            .then((result) => {              
                resolve({ message: "success" })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
        
   });
 }


 static getItemCompra(datoId) {      
	 return new Promise((resolve, reject) => {
    Nota.findOne({
      where: { compraId: datoId }, 
      raw: true,
      nest: true})
      .then((row)=> resolve( row ))    
      .catch((reason) => reject(reason));
  });
}

 static getItem(datoId) {    
  console.log(datoId)
	 return new Promise((resolve, reject) => {
    Nota.findOne({
      where: { membresiaId: datoId }, 
      raw: true,
      nest: true})
      .then((result) => {
         resolve({ Nota: result })           	    
             })     
      .catch((reason) => reject(reason));
  });
}

static item(datoId) {    
  return new Promise((resolve, reject) => {
    Nota.findOne({
      raw: true,
      nest: true,
      where: { id: datoId } 
    })
      .then((nota) => resolve(nota))
      .catch((reason) => reject(reason));
  });
}
 static delete(datoId) {
    return new Promise((resolve, reject) => {
        Nota.destroy({ where: { membresiaId: Number(datoId) } })
        .then((nota) => resolve(nota))
        .catch((reason) => reject(reason));
    });
  }


}

export default NotaService;
