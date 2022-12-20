import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Usuario, Cliente, Membresia, Paquete } = database;

class MembresiaService {

  static getAll(pag,num,nombres) {  
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       let iName = '%' + nombres + '%'
       if (nombres === '--todos--' || nombres === null || nombres === '0') { iName = '%' }

       
       Membresia.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         order: [['id', 'DESC']],
         attributes: ["id","ivigencia","fvigencia","estado","ingresos","paqueteId","intros","clienteId","usuarioId"],      
         include: [
          { model: Paquete, attributes: ["id", "nombre","valor"]},
          { model: Cliente, 
            attributes: ["id", "nombres"],
            where: {
              [Op.and]: [            
                { nombres: { [Op.iLike]: iName } }          
              ]
            }
          },
          { model: Usuario, attributes: ["id", "nombre"]}
        ],        

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

   static todu(dato, datoId) {	   
    return new Promise((resolve, reject) => {

    var dd = dato.createdAt ? new Date(dato.createdAt) : new Date('2020-01-01 03:24:55.528-04')
    var reg = (new Date(dd + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]	    
      Membresia.update({registro : reg}, { where: { id: Number(datoId) } })
        .then((membresia) => resolve(membresia))
        .catch((reason) => reject(reason));
    });
  }
	
  static getTodus(inicio,fin) {
   return new Promise((resolve, reject) => {
      Membresia.findAll({
        raw: true,
        nest: true,
	offset: parseInt(inicio),
        limit: parseInt(fin),      
        order: [['id', 'ASC']],
        attributes: ["id","usuarioId","createdAt"],
      })
        .then((membresias) =>
          resolve(membresias)
        )
        .catch((reason) => reject(reason));
    });
  }	 
   
  static totals(desde,hasta,usuarioId) {    
    return new Promise((resolve, reject) => {        
        Membresia.findAll({ 
          raw: true,
          nest: true,
          include: [{ model: Paquete, attributes: ["nombre","valor"]}],
          attributes: ['paqueteId',[Sequelize.fn('count', Sequelize.col('ingresos')), 'cantidad'],[Sequelize.fn('sum', Sequelize.col('ingresos')), 'total']],                      
	      where: {
         	 [Op.and]: [
	         { registro: { [Op.between]: [desde, hasta]}},
          	 { usuarioId: usuarioId },
                 { estado: true }]
          },	
          group: ['paqueteId','Paquete.nombre','Paquete.valor'],
        })           
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }

   static total(desde,hasta,usuarioId) {    
    return new Promise((resolve, reject) => {        
        Membresia.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('sum', Sequelize.col('ingresos')), 'total']],            
           where: {
                 [Op.and]: [
                   { registro: { [Op.between]: [desde, hasta]}},
                   { usuarioId: usuarioId },
                   { estado: true },
                  ]
          }, 		
	   
        })           
            .then((result) => {              
                resolve(result)
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }

  static totalDetalle(desde,hasta,usuarioId) {
    return new Promise((resolve, reject) => {       
       Membresia.findAndCountAll({
         raw: true,
         nest: true,         
         /*where :  { ivigencia: {[Op.between]: [desde, hasta]}},   */
	 where: {
          [Op.and]: [
            { registro: { [Op.between]: [desde, hasta]}},
            { estado: true },
            { usuarioId: usuarioId }
          ]
         },      
         order: [['ivigencia', 'DESC']],
         include: [
             { model: Paquete, attributes: ["id", "nombre","valor"]},
             { model: Cliente, attributes: ["id", "nombres"]},
		 { model: Usuario, attributes: ["id", "nombre"]}
  		 
         ]      
       })
         .then((membresias) =>
           resolve({             
             total: membresias.count,
             data: membresias.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }	
  static add(newmem) {    
    return new Promise((resolve, reject) => {        
        Membresia.create(newmem,{ 
          raw: true,
          nest: true})           
            .then((result) => {              
                resolve({ Membresia: result })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
     });
  }

   static getIt(datoId) { 
    return new Promise((resolve, reject) => {
      Membresia.findByPk(datoId, {
                raw: true,
                nest: true,
	        attributes: ["id", "createdAt"]
              })
        .then((result) => {
                resolve(result)
        })
        .catch((reason) => reject(reason));
    });
  }	

  static getItem(datoId) {    
    return new Promise((resolve, reject) => {
      Membresia.findByPk(datoId, {
		raw: true,
                nest: true,
	        include: [
            { model: Paquete, attributes: ["id", "nombre","valor"]}
        ]
	      })
        .then((result) => {
		resolve({ Membresia: result })
	})
        .catch((reason) => reject(reason));
    });
  }

  static getItemo(datoId) {    
    return new Promise((resolve, reject) => {
      Membresia.findByPk(datoId, {
		raw: true,
                nest: true,
	        include: [
            { model: Paquete, attributes: ["id", "nombre","valor"]},
            { model: Cliente, attributes: ["id", "nombres","ci"]}
        ]
	      })
        .then((result) => {
		resolve(result)
	})
        .catch((reason) => reject(reason));
    });
  }


  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Membresia.update(dato, { where: { id: Number(datoId) } })
        .then((membresia) => resolve(membresia))
        .catch((reason) => reject(reason));
    });
  }
  static getAllClientes(pag,num,clienteId) {
   return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Membresia.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
	where: { clienteId: Number(clienteId) },      
        order: [['fvigencia', 'DESC']],
	attributes: ["id","ivigencia","fvigencia","estado","ingresos","paqueteId","intros","clienteId","usuarioId"],      
	include: [
            { model: Paquete, attributes: ["id", "nombre","valor"]}
        ]      
      })
        .then((membresias) =>
          resolve({
            paginas: Math.ceil(membresias.count / num),
            pagina: page,
            total: membresias.count,
            data: membresias.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }	

   static delete(datoId) {
    return new Promise((resolve, reject) => {
        Membresia.destroy({ where: { id: Number(datoId) } })
        .then((membresia) => resolve(membresia))
        .catch((reason) => reject(reason));
    });
  }

  static getItemClienteActivo(clienteId) {  
    console.log(clienteId)  
      var d         = new Date()
      var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    return new Promise((resolve, reject) => {
      Membresia.findOne({
            where: { 
              clienteId: Number(clienteId),
              estado: true,
              fvigencia: {[Op.gte]: formatted } 
            },
		        raw: true,
            nest: true,
	          include: [{ model: Paquete, attributes: ["id", "nombre","valor"]}]
	      })
        .then((result) => {
		resolve({ Membresia: result })
	})
        .catch((reason) => reject(reason));
    });
  }
  /*************administrador***************/



  static atotals(desde,hasta) {
    return new Promise((resolve, reject) => {
        Membresia.findAll({
          raw: true,
          nest: true,
          include: [{ model: Paquete, attributes: ["nombre","valor"]}],
          attributes: ['paqueteId',[Sequelize.fn('count', Sequelize.col('ingresos')), 'cantidad'],[Sequelize.fn('sum', Sequelize.col('ingresos')), 'total']],
              where: {
                 [Op.and]: [
                 { registro: { [Op.between]: [desde, hasta]}},                 
                 { estado: true }]
          },
          group: ['paqueteId','Paquete.nombre','Paquete.valor'],
        })
            .then((result) => {
                resolve(result)
            })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
  }


   static atotal(desde,hasta) { 
    return new Promise((resolve, reject) => {
        Membresia.findOne({ 
          raw: true,
          nest: true,
          attributes: [[Sequelize.fn('sum', Sequelize.col('ingresos')), 'total']],
           where: {
                 [Op.and]: [
                   { registro: { [Op.between]: [desde, hasta]}},                   
                   { estado: true },
                  ]
          },

        })
            .then((result) => {
                resolve(result)
            })
            .catch((reason) => {
                reject({ message: reason.message })
              });
     });
  }

 static atotalDetalle(desde,hasta) {
    return new Promise((resolve, reject) => {
       Membresia.findAndCountAll({
         raw: true,
         nest: true,
         /*where :  { ivigencia: {[Op.between]: [desde, hasta]}},   */
         where: {
          [Op.and]: [
            { registro: { [Op.between]: [desde, hasta]}},
            { estado: true }
          ]
         },
         order: [['ivigencia', 'DESC']],
         include: [
             { model: Paquete, attributes: ["id", "nombre","valor"]},
             { model: Cliente, attributes: ["id", "nombres"]},
		 { model: Usuario, attributes: ["id", "nombre"]}

         ]
       })
         .then((membresias) =>
           resolve({
             total: membresias.count,
             data: membresias.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }








  /*************administrador***************/

}

export default MembresiaService;
