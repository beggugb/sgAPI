const db = require('../src/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { Compra, Proveedor, Sucursal, Usuario  } = db;


const item = (pky) =>{
    return new Promise((resolve,reject)=>{
        Compra.findByPk(pky,{
            raw:true,
            nest:true,
            include:[
                {model:Proveedor,as:"proveedor",attributes:["id","razonSocial"]},                
                {model:Usuario,as:"usuario",attributes:["id","nombre"]},
                {model:Sucursal,as:"sucursal",attributes:["id","nombre"]}                 
            ]
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        Compra.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const update = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{
        Compra.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve,reject)=>{
        Compra.destroy({
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
        Compra.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [[prop,value]],
            attributes:['id','fechaCompra','tipo','estado','observaciones','totalGeneral'],
            include:[
                {model:Proveedor,as:"proveedor",attributes:["id","razonSocial"]}                
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
        Compra.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 15,
            order: [['id','desc']],
            attributes:['id','fechaCompra','tipo','estado','observaciones','totalGeneral'],
            include:[
                { model:Proveedor,as:"proveedor",
                  attributes:["id","razonSocial"],
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
       Compra.findAll({
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
       Compra.findAll({
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

const totales = (desde,hasta) => {
    return new Promise((resolve, reject) => {
        Compra.findAll({
          raw: true,
          nest: true,
          attributes:['id','fechaAprobacion','nroItems','totalGeneral','estado','origen','observaciones'],
          where: {
            [Op.and]: [
              { fechaAprobacion : { [Op.between]: [desde, hasta]}},                   
              { estado: 'aprobado' },
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


const total = (desde,hasta) =>{ 
    return new Promise((resolve, reject) => {
        Compra.findOne({ 
          raw: true,
          nest: true,
          attributes: [[sequelize.fn('sum', sequelize.col('totalGeneral')), 'total']],
           where: {
                 [Op.and]: [
                   { fechaAprobacion : { [Op.between]: [desde, hasta]}},                   
                   { estado: 'aprobado' },
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
    totales,
    total
}

    /*where: {[Op.and]: [ 
                {[prop]:{[Op.iLike]: value}},                                
                {categoriaId : {[categoriaId === 0 ? Op.gt : Op.eq]:categoriaId }},
                {sucursalId : {[sucursalId === 0 ? Op.gt : Op.eq]:sucursalId }}                
                ]},*/