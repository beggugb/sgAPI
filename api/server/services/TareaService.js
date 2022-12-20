import database from "../src/models";
import moment from 'moment'
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Tarea, Usuario } = database;
/*save update data item single list search */
const data = (usuarioId,inicio,end) =>{
    return new Promise((resolve,reject)=>{
        Tarea.findAll({
            order: [['start','DESC']],
            attributes: ["id","title","start","end","backgroundColor","selectable","usuarioId","classNames","detalle"],        
            where: {
              [Op.and]: [{ usuarioId: { [Op.eq]: usuarioId }},                    
                         { start: {[Op.between]: [inicio, end]}}]
            },
        })
        .then((rows)=>
            resolve(rows)
        )
        .catch((reason)=>reject({message:reason}))

    })
}

const _delete = (id) =>{
    return new Promise((resolve,reject)=>{
        Tarea.destroy({
            where: {id: Number(id)}
        })
        .then((row)=>resolve({message:"eliminado"}))
        .catch((reason)=>reject({message:reason.message}))
    })
} 

const update = (dato,id) =>{
    return new Promise((resolve,reject)=>{
        Tarea.update(dato,{
            whre: { id: Number(id)}
        })
        .then((row)=>resolve({message:"success"}))
        .catch((reason)=>reject({message:reason.message}))
    })
}

const create = (dato) =>{
    return new Promise((resolve,reject)=>{
        Tarea.create(dato)
        .then((row)=>resolve({message:"success"}))
        .catch((reason)=>reject({message:reason.message}))
    })
}

const item = (pky) =>{
    return new Promise((resolve,reject)=>{
        Tarea.findByPk(pky,{
            raw:true,
            nest:true,
            attributes: ["id","title","start","end","backgroundColor","selectable","usuarioId","detalle"]
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message:reason.message}))
    })
}

module.exports = {
    item,    
    create,
    update,
    _delete,
    data
}
