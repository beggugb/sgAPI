const proveedorService = require("../services/proveedorService.js");
const {verifiDBNull} = require('../../functions/env')

const getItem = (req,res) =>{        
        proveedorService.item(req.params.id)
        .then((row)=>{
            res.status(200).send({result: row})                
        })    
}

const getData = (req,res) =>{         
        proveedorService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })     
}

const setUpdate = (req,res) =>{        
        proveedorService.update(req.body,req.params.id)
        .then((xrow)=>{
            proveedorService.item(req.params.id)
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{                
            res.status(400).send({message: reason})
        })        
}

const setCreate = (req,res) =>{    
        proveedorService.create(req.body)
        .then((row)=>{            
                res.status(200).send({result: row})    
            })        
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })
}

const setDelete = (req,res) =>{        
        proveedorService._delete(req.params.id)
        .then((xrow)=>{
            proveedorService.data(1,12,'razonSocial','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })    
}

const getItems = (req,res) =>{
    proveedorService.items()
    .then((rows)=>{
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{        
        res.status(400).send({message: reason})
    })    
}

const getSearch = (req, res) =>{
  const { prop, value  } = req.body
  let ivalue = verifiDBNull(value)
    proveedorService.search(prop, ivalue)
    .then((rows)=>{
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    })
}

module.exports={
    getItem,
    getData,
    setUpdate,
    setCreate,
    setDelete,
    getItems,    
    getSearch
}