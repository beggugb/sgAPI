const modeloService = require("../services/modeloService.js");
const {verifiDBNull} = require('../../functions/env')

const getItem = (req,res) =>{        
        modeloService.item(req.params.id)
        .then((row)=>{
            res.status(200).send({result: row})                
        })    
}

const getData = (req,res) =>{       
        modeloService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })     
}

const setUpdate = (req,res) =>{        
        modeloService.update(req.body,req.params.id)
        .then((xrow)=>{            
            modeloService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{                
            res.status(400).send({message: reason})
        })        
}

const setCreate = (req,res) =>{    
        modeloService.create(req.body)
        .then((row)=>{
            modeloService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})   
            })
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })
}

const setDelete = (req,res) =>{    
        modeloService._delete(req.params.id)
        .then((xrow)=>{
            modeloService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })    
}

const getItems = (req,res) =>{
    modeloService.items()
    .then((rows)=>{
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{        
        res.status(400).send({message: reason})
    })    
}

const getSearch = (req, res) =>{
  const { prop, value  } = req.body
  let ivalue = verifiDBNull(value)
    modeloService.search(prop, ivalue)
    .then((rows)=>{
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    })
}

const getList = (req,res) =>{
    modeloService.list(req.params.id)
    .then((rows)=>{
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{        
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
    getList,
    getSearch
}
