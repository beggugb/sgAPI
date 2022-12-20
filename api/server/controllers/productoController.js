import productoService from "../services/productoService.js"
import { verifiDBNull, verifiDBNulls, verifiDBEmpty } from '../../functions/env'


    const  getItem =(req,res)=>{         
        productoService.item(req.params.id)
            .then((row)=>{
                res.status(200).send({result: row})                
            })    
            .catch((reason)=>{
                res.status(400).send({message: reason})
            })     
    }
    
    const  getData =(req,res)=>{       
        productoService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
            .then((rows)=>{
                res.status(200).send({result: rows})
            })
            .catch((reason)=>{
                res.status(400).send({message: reason})
            })     
    }
    
    const  setUpdate =(req,res)=>{   
        const { te, ter, cp  } = req.body
        let newDato = req.body
        newDato.sma = (parseInt(te) * parseInt(cp)) +  (parseInt(te) * parseInt(cp))  
        newDato.ms  = (parseInt(ter) - parseInt(te)) *  parseInt(cp)     
        newDato.smi = parseInt(te) * parseInt(cp)
        newDato.pr  = (parseInt(te) * parseInt(cp)) +  (parseInt(ter) - parseInt(te))* parseInt(cp)  

            productoService.update(newDato,req.params.id)
            .then((xrow)=>{
                productoService.item(req.params.id)
                .then((row)=>{
                   res.status(200).send({result:row})
                })
            })
            .catch((reason)=>{                
                res.status(400).send({message: reason})
            })        
    }
    
    const  setCreate =(req,res)=>{  
        const { te, ter, cp  } = req.body
        let newDato = req.body
        newDato.sma = (parseInt(te) * parseInt(cp)) +  (parseInt(te) * parseInt(cp))  
        newDato.ms  = (parseInt(ter) - parseInt(te)) *  parseInt(cp)     
        newDato.smi = parseInt(te) * parseInt(cp)
        newDato.pr  = (parseInt(te) * parseInt(cp)) +  (parseInt(ter) - parseInt(te))* parseInt(cp)
            productoService.create(newDato)
            .then((row)=>{
                res.status(200).send({result:row})
            })
            .catch((reason)=>{      
                console.log(reason)           
                res.status(400).send({message: "error de registro"})
            })
    }
    
    const  setDelete =(req,res)=>{    
            productoService._delete(req.params.id)
            .then((xrow)=>{
                productoService.data(1,12,'nombre','asc')
                .then((rows)=>{
                    res.status(200).send({result: rows}) 
                })
            })
            .catch((reason)=>{
                res.status(400).send({message: reason})
            })    
    }
    
    const  getItems =(req,res)=>{
        productoService.items()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
    
    const  getSearch =(req, res)=>{
      console.log(req.body)	    
      const { prop, value  } = req.body
      let ivalue = verifiDBNull(value)
        productoService.search(prop, ivalue)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

    const  setCopiar=(req,res)=>{        
        productoService.item(req.params.id)
        .then((producto)=>{
            let newItem = producto
            newItem.id = null
            newItem.createdAt = null
            newItem.updatedAt = null            
            newItem.nombre = producto.nombre+'(copia)'
            productoService.create(newItem)
            .then((it)=>{
                productoService.data(1,12,'nombre','DESC')
                .then((items)=>{
                    res.status(200).send({message:"producto copiado",result:items})
                })
            })
            .catch((reason) => {              
                res.status(400).send({ message: reason });
            });

        })
        .catch((reason) => {                                                              
            res.status(400).send({ message: reason });
        });
    }

    const  getSearchItems =(req, res)=>{
        const { prop, value  } = req.body
        let ivalue = verifiDBNulls(value)               
          productoService.lista(prop, ivalue)
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
        setCopiar,
        setDelete,
        getItems,    
        getSearch,
        getSearchItems
    }
