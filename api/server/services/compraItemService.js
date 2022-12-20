const db = require('../src/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { CompraItem, Producto } = db;

const data = (compraId) =>{
    return new Promise((resolve, reject)=>{             
        CompraItem.findAll({
            raw:true,
            nest:true,            
            order: [['id','asc']],
            attributes:['id','cantidad','codigo','unidad','categoria','marca','compraId','productoId','valor','nombre','subTotal'],
            /*include:[                
                {model:Producto,as:"producto",attributes:["id","nombre","precioVenta"]}
            ],*/
            where:{ compraId: compraId}
        })        
        .then((rows)=> resolve(rows))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (data) =>{
    return new Promise((resolve,reject) =>{
       CompraItem.bulkCreate(data,{individualHooks: true})
        .then((rows) => resolve({ message: 'compras registrada' }))
        .catch((reason)  => reject({ message: reason.message }))      
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve,reject)=>{
        CompraItem.destroy({
            where : { compraId: Number(datoId)}
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

