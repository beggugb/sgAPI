const db = require('../src/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { Sucursal } = db;

const item = (pky) =>{
    return new Promise((resolve,reject)=>{
        Sucursal.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        Sucursal.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const update = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{
        Sucursal.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve,reject)=>{
        Sucursal.destroy({
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
        Sucursal.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [[prop,value]],
            attributes:['id','nombre','encargado']
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
        Sucursal.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 15,
            order: [['nombre','asc']],
            attributes:['id','nombre','abreviacion'],
            where:{[prop]:{[Op.iLike]: value}}
        })
        .then((rows)=>resolve({
            paginas: 15,
            pagina: 1,
            total: rows.count,
            data:rows.rows
        }))
        .catch((reason)=> reject({message: reason.message}))

    })
}

const items = () =>{
    return new Promise((resolve,reject)=>{
       Sucursal.findAll({
        raw:true,
        nest:true,
        order: [['nombre','asc']],
        attributes:[['nombre','label'],['id','value']],
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}

const getItems = () =>{
    return new Promise((resolve,reject) =>{
        Sucursal.findAll({
          raw: true,
          nest: true,                
          order: [['nombre','ASC']],
          attributes:[['nombre','label'],['id','value']],              
          where: {[Op.and]: [
            { id: { [Op.lt]: 100}}                
           ]},
          })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
}

module.exports = {
    item,
    items,
    create,
    update,
    _delete,
    data,
    search,
    getItems
}