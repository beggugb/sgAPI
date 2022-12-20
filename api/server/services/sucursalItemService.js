const db = require('../src/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { SucursalItem, Producto, Categoria, Marca, Unidad } = db;


const stock = (value,cat) =>{    
    console.log(cat)
    return new Promise((resolve, reject)=>{
        SucursalItem.findAll({
            raw: true,
            nest: true,            
            order: [['id','asc']], 
            limit:15,
            /*where:{stock:{[Op.gt]: 0}},                */
            include:[
                {
                    model:Producto,as:"producto",
                    attributes:["id","nombre","filename","codigo","precioVenta"],
                    /*where:{nombre:{[Op.iLike]: value}}, */
                    where: {[Op.and]: [                                           
                        { nombre:{[Op.iLike]: value}},
                        { categoriaId : cat }                
                        ]},
                    include:[
                        {model:Categoria,as:"categoria",attributes:["id","nombre"]},
                        {model:Marca,as:"marca",attributes:["id","nombre"]},
                        {model:Unidad,as:"unidad",attributes:["id","nombre"]}
                    ]
                },                
            ]              
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=> console.log(reason))

    })
}


const verifiStock = (pky,sucursalId) =>{
    return new Promise((resolve, reject)=>{             
        SucursalItem.findOne({
            raw:true,
            nest:true,                                    
            where: {[Op.and]: [                                           
                { productoId : pky },
                { sucursalId : sucursalId }                
                ]}
        })        
        .then((row)=> resolve(row))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        SucursalItem.create(dato)
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const update = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{
        SucursalItem.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}


const getDetalle = (productoId,categoriaId) =>{
    return new Promise((resolve,reject) =>{   

      let art = productoId === 0 || productoId === '' || productoId === undefined ? 0:productoId 
      let cat = categoriaId === 0 || categoriaId === '' || categoriaId === undefined ? 0:categoriaId 
      
      SucursalItem.findAndCountAll({
        raw: true,
        nest: true,                     
        where: {[Op.and]: [                      
          { productoId: {[art === 0 ? Op.gt: Op.eq]: art }}
        ]},   
          include: [{ 
            model: Producto,  as: "producto",            
            where: {[Op.and]: [                
              { categoriaId: {[cat === 0 ? Op.gt: Op.eq]: cat}},                                              
            ]},
            attributes:['id','codigo','nombreCorto','precioVenta','nombre','precioVenta','filename','categoriaId'],
            include:[
              {model:Marca,as:"marca",attributes:["id","nombre"]},
              {model:Categoria,as:"categoria",attributes:["id","nombre"]}
            ]
            }            
          ]  
  
       })
        .then((rows)=> resolve({            
          total: rows.count,
          data: rows.rows
        } ))
        .catch((reason) => reject({ message: reason.message }))      
    })
  }





module.exports = {
    verifiStock,
    create,
    update,
    stock,
    getDetalle
}