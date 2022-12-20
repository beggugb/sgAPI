import database from "../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Articulo, Categoria} = database;

class ArticuloService {
    
   static add(newarticulo) {    
    return new Promise((resolve, reject) => {
        if(newarticulo.nombre)
        {            
            Articulo.create(newarticulo)
            .then((articulo) => {                
                resolve({ message: "articulo registrado", articulo: articulo })
            })
            .catch((reason) => { 
              console.log(reason)               
                reject({ message: reason.message, articulo: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", articulo: null })
        }        
   });
  } 

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Articulo.update(dato, { where: { id: Number(datoId) } })
        .then((articulo) => resolve(articulo))
        .catch((reason) => reject(reason));
    });
  }

  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Articulo.destroy({ where: { id: Number(datoId) } })
        .then((articulo) => resolve(articulo))
        .catch((reason) => reject(reason));
    });
  }

  static getItem(datoId) {
    return new Promise((resolve, reject) => {
      Articulo.findByPk(datoId,{
	include: [
            { model: Categoria, attributes: ["id", "nombre"]}
        ]
      })
        .then((articulo) => resolve(articulo))
        .catch((reason) => reject(reason));
    });
  }

  static getAll(pag,num,prop,orden) {  
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Articulo.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],        
        attributes: ["id","nombre","code","filename","pventa","stock"],
        include: [            
            { model: Categoria, attributes: ["id", "nombre"]}
        ]         
      })
        .then((articulos) =>
          resolve({
            paginas: Math.ceil(articulos.count / num),
            pagina: page,
            total: articulos.count,
            data: articulos.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static search(nombre) { 
    return new Promise((resolve, reject) => {
      let num = 12;
      let page = 1;
      let der = num * page - num;
      
      let iName = '%' + nombre + '%'
      if (nombre === '--todos--' || nombre === null || nombre === '0') { iName = '%' }


      

      Articulo.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['nombre','ASC']],    
        where: {nombre: { [Op.iLike]: iName }},    
	attributes: ["id","nombre","code","filename","pventa","stock"],      
        include: [
            { model: Categoria, attributes: ["id", "nombre"]},
        ]         
      })
        .then((articulos) =>
          resolve({
            paginas: Math.ceil(articulos.count / num),
            pagina: page,
            total: articulos.count,
            data: articulos.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

   static getAllCategorias(pag,num,categoria) {
   return new Promise((resolve, reject) => {
	   
    let icategoria = 0
    let fcategoria = 30		   
      if (categoria === '0' || categoria === undefined || categoria === null || categoria === 0)
         { console.log('pp') }
      else{
          icategoria = categoria
          fcategoria = categoria

      }	    
/* {createdAt: {[Op.between]: [desde, hasta]}},*/

      let page = parseInt(pag);
      let der = num * page - num;
      Articulo.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['nombre','ASC']],
         where: {categoriaId: {[Op.between]: [icategoria, fcategoria]}},      
        attributes: ["id","nombre","code","filename","pventa","stock"],
        include: [
            { model: Categoria, attributes: ["id", "nombre"]}
        ]
      })
        .then((articulos) =>
          resolve({
            paginas: Math.ceil(articulos.count / num),
            pagina: page,
            total: articulos.count,
            data: articulos.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }
	 
 
}

export default ArticuloService;
