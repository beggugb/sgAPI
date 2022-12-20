const tipoService = require("../services/tipoService.js");
const {verifiDBNull} = require('../../functions/env')

const getItem = (req,res) =>{        
        tipoService.item(req.params.id)
        .then((row)=>{
            res.status(200).send({result: row})                
        })    
}

const getData = (req,res) =>{       
        tipoService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })     
}

const setUpdate = (req,res) =>{        
        tipoService.update(req.body,req.params.id)
        .then((xrow)=>{            
            tipoService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{                
            res.status(400).send({message: reason})
        })        
}

const setCreate = (req,res) =>{    
        tipoService.create(req.body)
        .then((row)=>{
            tipoService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})   
            })
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })
}

const setDelete = (req,res) =>{    
        tipoService._delete(req.params.id)
        .then((xrow)=>{
            tipoService.data(1,12,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })    
}

const getItems = (req,res) =>{
    tipoService.items()
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
    tipoService.search(prop, ivalue)
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
