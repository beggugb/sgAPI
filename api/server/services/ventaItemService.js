const db = require('../src/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { VentaItem, Producto } = db;

const data = (ventaId) =>{
    return new Promise((resolve, reject)=>{             
        VentaItem.findAll({
            raw:true,
            nest:true,            
            order: [['id','asc']],
            attributes:['id','cantidad','codigo','unidad','categoria','marca','ventaId','productoId','valor','nombre','subTotal'],        
            where:{ ventaId: ventaId}
        })        
        .then((rows)=> resolve(rows))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (data) =>{
    return new Promise((resolve,reject) =>{
       VentaItem.bulkCreate(data,{individualHooks: true})
        .then((rows) => resolve({ message: 'ventas registrada' }))
        .catch((reason)  => reject({ message: reason.message }))      
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve,reject)=>{
        VentaItem.destroy({
            where : { ventaId: Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}


module.exports={
    _delete,
    create,
    data
}

