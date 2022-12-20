import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Sucursal } = database;

class SucursalService {
    
   static add(newSucursal) {    
    return new Promise((resolve, reject) => {
        if(newSucursal.nombre)
        {            
            Sucursal.create(newSucursal)
            .then((Sucursal) => {                
                resolve({ message: "Sucursal registrado", Sucursal: Sucursal })
            })
            .catch((reason) => {                
                reject({ message: reason.message, Sucursal: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", Sucursal: null })
        }        
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Sucursal.update(dato, { where: { id: Number(datoId) } })
        .then((Sucursal) => resolve(Sucursal))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Sucursal.destroy({ where: { id: Number(datoId) } })
        .then((Sucursal) => resolve(Sucursal))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Sucursal.findByPk(datoId)
        .then((Sucursal) => resolve(Sucursal))
        .catch((reason) => reject(reason));
    });
  }

  static lista() {  
   return new Promise((resolve, reject) => {
      Sucursal.findAll({
	attributes: [["id","value"],["nombre","label"]],      
        order: [['nombre','ASC']]
      })
        .then((sucursales) =>
          resolve(sucursales)
        )
        .catch((reason) => reject(reason));
    });
  }
 
static getAll(pag,num,prop,orden) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Sucursal.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]]
      })
        .then((Sucursals) =>
          resolve({
            paginas: Math.ceil(Sucursals.count / num),
            pagina: page,
            total: Sucursals.count,
            data: Sucursals.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	
  
}

export default SucursalService;
