const db = require('../src/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { Venta, Cliente, Sucursal, Usuario  } = db;


const item = (pky) =>{
    return new Promise((resolve,reject)=>{
        Venta.findByPk(pky,{
            raw:true,
            nest:true,
            include:[
                {model:Cliente,as:"cliente",attributes:["id","nombres","apellidos"]},                
                {model:Usuario,as:"usuario",attributes:["id","nombres","apellidos"]},
                {model:Sucursal,as:"sucursal",attributes:["id","nombre"]}                 
            ]
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        Venta.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const update = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{
        Venta.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve,reject)=>{
        Venta.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const data = (pag,num,prop,value) =>{
    return new Promise((resolve, reject)=>{
        let page = parseInt(pag)
        let der = num * page - num        
        Venta.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [[prop,value]],
            attributes:['id','fechaVenta','tipo','estado','observaciones','totalGeneral'],
            include:[
                {model:Cliente,as:"cliente",attributes:["id","nombres","apellidos"]}                
            ]
        })        
        .then((rows)=> resolve({
            paginas : Math.ceil(rows.count / num),
            pagina  : page,
            total   : rows.count,
            data    : rows.rows
        }))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const search = (prop,value,values) =>{
    return new Promise((resolve, reject)=>{
        Venta.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 15,
            order: [['id','desc']],
            attributes:['id','fechaVenta','tipo','estado','observaciones','totalGeneral'],
            include:[
                { model:Cliente,as:"cliente",
                  attributes:["id","nombres","apellidos"],
                  where:{'razonSocial':{[Op.iLike]: values}} 
                }                
            ],
            where:{[prop]:{[Op.iLike]: value}}           
        })
        .then((rows)=>resolve({
            paginas: Math.ceil(rows.count / 12),
            pagina: 1,
            total: rows.count,
            data:rows.rows
        }))
        .catch((reason)=> reject({message: reason.message}))

    })
}

const items = () =>{
    return new Promise((resolve,reject)=>{
       Venta.findAll({
        raw:true,
        nest:true,
        order: [['nombre','asc']],
        attributes:[['nombre','label'],['id','value']],
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}

const list = (id) =>{
    return new Promise((resolve,reject)=>{
       Venta.findAll({
        raw:true,
        nest:true,
        order: [['nombre','asc']],
        attributes:[['nombre','label'],['id','value']],
        /*where: { categoriaId : Number(id)}*/

       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}

const totals = (desde,hasta,usuarioId) => {    
    return new Promise((resolve, reject) => {  
        let iuser = 0
        let fuser = 30

        if (usuarioId === '' || usuarioId === undefined || usuarioId === null || usuarioId === 0) 
            { console.log('pp') }	      
        else{
            iuser = usuarioId
            fuser = usuarioId    		      
        }       
        Venta.findAll({ 
          raw: true,
          nest: true,
          attributes: ["id","fechaVenta","totalGeneral","origen","observaciones","gestion","mes"],
          include: [{ model: Usuario,as:"usuario",attributes: ["id","nombre"]}],          
	      where: {
         	 [Op.and]: [
	         { fechaVenta: { [Op.between]: [desde, hasta]}},
             { estado: 'cerrado' },
             {usuarioId: {[Op.between]: [iuser, fuser]}}
          	 /*{ usuarioId: usuarioId }*/
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

  const total = (desde,hasta,usuarioId) => {     
    return new Promise((resolve, reject) => {          
      let iuser = 0
      let fuser = 30

      if (usuarioId === '' || usuarioId === undefined || usuarioId === null || usuarioId === 0) 
	    { console.log('pp') }	      
      else{
        iuser = usuarioId
        fuser = usuarioId    		      
      }     
        Venta.findOne({ 
          raw: true,
          nest: true,
          attributes: [[sequelize.fn('sum', sequelize.col('totalGeneral')), 'total']],            
           where: {
                 [Op.and]: [
                   { fechaVenta: { [Op.between]: [desde, hasta]}},
                   { estado: 'cerrado' },
                   {usuarioId: {[Op.between]: [iuser, fuser]}}
                   /*{ usuarioId: usuarioId }                   */
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

module.exports = {
    item,
    items,
    create,
    update,
    _delete,
    data,
    search,
    total,
    totals
}