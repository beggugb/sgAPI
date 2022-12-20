const categoriaService = require("../services/categoriaService.js");
const {verifiDBNull} = require('../../functions/env')

const getItem = (req,res) =>{        
        categoriaService.item(req.params.id)
        .then((row)=>{
            res.status(200).send({result: row})                
        })    
}

const getData = (req,res) =>{       
        categoriaService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })     
}

const setUpdate = (req,res) =>{        
        categoriaService.update(req.body,req.params.id)
        .then((xrow)=>{
            categoriaService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{                
            res.status(400).send({message: reason})
        })        
}

const setCreate = (req,res) =>{    
        categoriaService.create(req.body)
        .then((row)=>{
            categoriaService.data(1,15,'nombre','asc')
            .then((rows)=>{
                res.status(200).send({result: rows})    
            })
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })
}

const setDelete = (req,res) =>{    
        categoriaService._delete(req.params.id)
        .then((xrow)=>{
            categoriaService.data(1,12,'nombre','asc')
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
    categoriaService.items()
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
    categoriaService.search(prop, ivalue)
    .then((rows)=>{
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{
        console.log(reason)
        res.status(400).send({message: reason})
    })
}

module.exports ={
    getItem,
    getData,
    setUpdate,
    setCreate,
    setDelete,
    getItems,
    getSearch
}
