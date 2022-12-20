const db = require('../src/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { Tdc } = db;

const item = (pky) =>{
    return new Promise((resolve,reject)=>{
        Tdc.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        Tdc.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const update = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{
        Tdc.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve,reject)=>{
        Tdc.destroy({
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
        Tdc.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [[prop,value]],
            attributes:['id','nombre','abreviacion']
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

const search = (prop,value) =>{
    return new Promise((resolve, reject)=>{
        Tdc.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 12,
            order: [['nombre','asc']],
            attributes:['id','nombre','abreviacion'],
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
       Tdc.findAll({
        raw:true,
        nest:true,
        order: [['nombre','asc']],
        attributes:[['nombre','label'],['id','value']],
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}

const verificar = (pky) => {      
    var fechaHoy = new Date()    
    var fHoy = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]  
    var fGestion = fechaHoy.getFullYear()
  
    return new Promise((resolve, reject) => {        
      Tdc.findOne({
        raw: true,
        nest: true,            
        where :  {
            [Op.and]: [
                { start :{ [Op.eq]: fHoy }},
                { gestion :{ [Op.eq]: fGestion.toString()  }}
            ] 
        }
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
    verificar
}