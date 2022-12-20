import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Cliente } = database;

class ClienteService {
    
   static add(newCliente) {         
    return new Promise((resolve, reject) => {
        if(newCliente.nombres)
        {            
            Cliente.create(newCliente)
            .then((cliente) => {                
                resolve({ message: "Cliente registrado", cliente: cliente })
            })
            .catch((reason) => {                
                reject({ message: reason.message, cliente: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", cliente: null })
        }        
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Cliente.update(dato, { where: { id: Number(datoId) } })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Cliente.destroy({ where: { id: Number(datoId) } })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
      Cliente.findByPk(datoId)
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static getIt(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
      Cliente.findByPk(datoId,{
        raw: true,
        nest: true
      })
        .then((cliente) => resolve({Cliente: cliente}))
        .catch((reason) => reject(reason));
    });
  }

  static getCI(datoId) {
    console.log(datoId)
    return new Promise((resolve, reject) => {
     Cliente.findOne({
        raw: true,
        nest: true,
        where: { ci: { [Op.eq]: datoId }}      
      })
        .then((cliente) => resolve({Cliente: cliente}))
        .catch((reason) => reject(reason));
    });
  }	

  static getAll(pag,num,prop,orden) {  
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Cliente.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],
	attributes: ["id","nombres","direccion","nit","ci","estado","filename"]      
      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: page,
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static search(pag,num,nombres,ci,nit) {    	
    return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      
      let iName = '%' + nombres + '%'
      if (nombres === '--todos--' || nombres === null || nombres === '0') { iName = '%' }

      let iCi = '%' + ci + '%'
      if (ci === '--todos--' || ci === null || ci === '0') { iCi = '%' }

      let iNit = '%' + nit + '%'
      if (nit === '--todos--' || nit === null || nit === '0') { iNit = '%' }
      

      Cliente.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['nombres', 'ASC']],    
        where: {
          [Op.and]: [            
            { nombres: { [Op.iLike]: iName } },
            { ci: { [Op.iLike]: iCi } }
          ]
        },    
        attributes: ["id","nombres","direccion","telefono","email","estado","nit","ci","filename"]        
      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: page,
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static reporte(desde, hasta) {    	
    return new Promise((resolve, reject) => {
      Cliente.findAndCountAll({
        raw: true,
        nest: true,        
        order: [['nombres', 'ASC']],    
        where: {
          [Op.and]: [            
            { createdAt: {[Op.between]: [desde, hasta]}},
          ]
        },    
        attributes: ["id","nombres","direccion","telefono","email","estado","nit","ci","createdAt"]        
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

  static totales (desde, hasta) {
    return new Promise((resolve, reject) => {
      Cliente.findAll({
        raw: true,
        nest: true,        
        order: [['nombres', 'ASC']],    
        attributes: ["id","nombres","direccion","telefono","email","estado","nit","ci"],    
        attributes: [[Sequelize.fn('sum', Sequelize.col('saldoTotal')), 'total']],    
        where: {
          [Op.and]: [            
            { createdAt: {[Op.between]: [desde, hasta]}},
          ]
        }
      })
        .then((clientes) =>
          resolve(clientes)
        )
        .catch((reason) => reject(reason));
    });
  }

  static verificar(ci) {      
    return new Promise((resolve, reject) => {        
      Cliente.findOne({
        raw: true,
        nest: true,            
        where : { ci: {[Op.eq]: ci }}
      })           
      .then((result) => { resolve(result)})
        .catch((reason) => { reject({ message: reason.message })});             
    });
  }
}

export default ClienteService;
