const volumenService = require("../services/volumenService.js");
const {verifiDBNull} = require('../../functions/env')

const getItem = (req,res) =>{        
        volumenService.item(req.params.id)
        .then((row)=>{
            res.status(200).send({result: row})                
        })    
}

const getData = (req,res) =>{       
        volumenService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })     
}

const setUpdate = (req,res) =>{        
        volumenService.update(req.body,req.params.id)
        .then((xrow)=>{            
            volumenService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{                
            res.status(400).send({message: reason})
        })        
}

const setCreate = (req,res) =>{    
        volumenService.create(req.body)
        .then((row)=>{
            volumenService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})   
            })
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })
}

const setDelete = (req,res) =>{    
        volumenService._delete(req.params.id)
        .then((xrow)=>{
            volumenService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })    
}

const getItems = (req,res) =>{
    volumenService.items()
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
    volumenService.search(prop, ivalue)
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
