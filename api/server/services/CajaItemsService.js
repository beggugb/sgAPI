import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { CajaItems } = database;

class CajaItemsService {

  static todu(dato, datoId) {	   
    return new Promise((resolve, reject) => {
    var dd = dato.createdAt ? new Date(dato.createdAt) : new Date('2020-01-01 03:24:55.528-04')
    var reg = (new Date(dd + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]	    
      CajaItems.update({registro : reg}, { where: { id: Number(datoId) } })
        .then((caja) => resolve(caja))
        .catch((reason) => reject(reason));
    });
  }

  static getAlls() {        
    return new Promise((resolve, reject) => {        
        CajaItems.findAll({
            order: [['createdAt', 'DESC']],                   
            attributes:['id','createdAt']           
        })
        .then((rows) => {                
                resolve(rows)
            })
        .catch((reason) => {                
                reject({ message: reason.message, data: null })
         });
       });
   }
   
  static add(newCaja) {    
    return new Promise((resolve, reject) => {        
        CajaItems.create(newCaja)
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
        
   });
  } 
  
  static getAll(usuarioId) {        
    return new Promise((resolve, reject) => {        
        CajaItems.findAll({
            order: [['id', 'ASC']],       
            limit: 10,     
            attributes:['id','descripcion','estado','userId','registro'],
            where: { userId: { [Op.eq]: usuarioId }}            
        })
        .then((CajaItemss) => {                
                resolve({ message: "Lista CajaItemss", data: CajaItemss })
            })
        .catch((reason) => {                
                reject({ message: reason.message, data: null })
         });
       });
   }
   static getAllCaja(pag,num,prop,orden,cajaId) {  
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       CajaItems.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         where: { cajaId: { [Op.eq]: cajaId }},
         order: [[prop, orden]],                
       })
         .then((cajas) =>
           resolve({
             paginas: Math.ceil(cajas.count / num),
             pagina: page,
             total: cajas.count,
             data: cajas.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }

 static getItemsCaja(cajaId) {
    return new Promise((resolve, reject) => {
       CajaItems.findAll({
         raw: true,
         nest: true,
         where: { cajaId: { [Op.eq]: cajaId }},
         order: [['id', 'DESC']],
       })
         .then((cajas) =>
           resolve(cajas)
         )
         .catch((reason) => reject(reason));
     });
   }

  
}

export default CajaItemsService;
