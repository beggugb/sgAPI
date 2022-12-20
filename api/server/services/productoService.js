const db = require('../src/models');
const sequelize = require('sequelize');

const Op = sequelize.Op;

const { Producto, Categoria, Marca, Modelo, Origen, Unidad, Industria, Volumen, Tipo   } = db;

const item = (pky) =>{
    return new Promise((resolve,reject)=>{
        Producto.findByPk(pky,{
            raw:true,
            nest:true,
            include:[
                {model:Categoria,as:"categoria",attributes:["id","nombre"]},                         
                {model:Marca,as:"marca",attributes:["id","nombre"]},
                {model:Modelo,as:"modelo",attributes:["id","nombre"]},
                {model:Origen,as:"origen",attributes:["id","nombre"]},
                {model:Unidad,as:"unidad",attributes:["id","nombre"]},
                {model:Industria,as:"industria",attributes:["id","nombre"]},
                {model:Volumen,as:"volumen",attributes:["id","nombre"]},
                {model:Tipo,as:"tipos",attributes:["id","nombre"]}
            ]
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        Producto.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason}))
    })
}

const update = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{        
        Producto.update(dato,{
            where: { id: Number(datoId) }
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve, reject)=>{
        Producto.destroy({
            where: { id: Number(datoId) }
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const data = (pag,num,prop,value) =>{
    return new Promise((resolve, reject)=>{
        let page = parseInt(pag)
        let der = num * page - num        
        Producto.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [[prop,value]],
            attributes:['id','nombre','codigo','filename','categoriaId'],
            include:[
                {model:Categoria,as:"categoria",attributes:["id","nombre"]},                         
                {model:Industria,as:"industria",attributes:["id","nombre"]}
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

const search = (prop,value) =>{
    return new Promise((resolve, reject)=>{
        Producto.findAndCountAll({
            raw: true,
            nest: true,
            offset: 0,
            limit: 12,
            order: [['nombre','asc']],            
            where:{[prop]:{[Op.iLike]: value}},
            attributes:['id','nombre','codigo','filename','categoriaId'],
            include:[
                {model:Categoria,as:"categoria",attributes:["id","nombre"]},                         
                {model:Industria,as:"industria",attributes:["id","nombre"]}                         
            ]
        })
        .then((rows)=>resolve({
            paginas : Math.ceil(rows.count / 12),
            pagina: 1,
            total: rows.count,
            data:rows.rows
        }))
        .catch((reason)=> reject({message: reason.message}))

    })
}

const items = () =>{
    return new Promise((resolve,reject)=>{
       Producto.findAll({
        raw:true,
        nest:true,
        order: [['nombre','asc']],
        attributes:[['nombre','label'],['id','value']],        
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}

const lista = (prop,value) =>{    
    return new Promise((resolve, reject)=>{
        Producto.findAll({
            raw: true,
            nest: true,            
            order: [['nombre','asc']], 
            limit:15,
            where:{[prop]:{[Op.iLike]: value}},    
            attributes:['id','nombre','codigo','filename','categoriaId'],
            include:[
                {model:Categoria,as:"categoria",attributes:["id","nombre"]},
                {model:Marca,as:"marca",attributes:["id","nombre"]},
                {model:Unidad,as:"unidad",attributes:["id","nombre"]}
            ]   
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=> console.log(reason))

    })
}
module.exports = {
    item,
    items,
    lista,
    create,
    update,
    _delete,
    data,
    search
}

    /*where: {[Op.and]: [ 
                {[prop]:{[Op.iLike]: value}},                                
                {categoriaId : {[categoriaId === 0 ? Op.gt : Op.eq]:categoriaId }},
                {sucursalId : {[sucursalId === 0 ? Op.gt : Op.eq]:sucursalId }}                
                ]},*/