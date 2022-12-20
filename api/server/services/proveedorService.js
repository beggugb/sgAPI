const db = require('../src/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { Proveedor } = db;

const item = (pky) =>{
    return new Promise((resolve,reject)=>{
        Proveedor.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        Proveedor.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const update = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{
        Proveedor.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve,reject)=>{
        Proveedor.destroy({
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
        Proveedor.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [[prop,value]],
            attributes:['id','razonSocial','codigo','tipoProveedor','nit','tipoFiscal']
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
        Proveedor.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 12,
            order: [['razonSocial','asc']],
            attributes:['id','razonSocial','codigo','tipoProveedor','nit','tipoFiscal'],
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
       Proveedor.findAll({
        raw:true,
        nest:true,
        order: [['razonSocial','asc']],
        attributes:[['razonSocial','label'],['id','value']],
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}

module.exports = {
    item,
    items,
    create,
    update,
    _delete,
    data,
    search
}