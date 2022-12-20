import { verifiDBNull } from '../../functions/env'
import compraService from "../services/compraService.js"
import compraItemService from "../services/compraItemService"
import sucursalItemService from "../services/sucursalItemService"
import notaService from "../services/NotaService"
import planPagoService from "../services/PlanService"
import empresaService from "../services/EmpresaService"
import tdcService from "../services/tdcService"
/*import comprobanteController from "../controllers/comprobanteController"*/

const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const mes = fechaHoy.getMonth() + 1
const fechaCompra  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      

    const setAprobar= (req,res) => {
      const { total } = req.body      
       
        Promise.all([
        compraService.item(req.params.id),
        compraItemService.data(req.params.id)    
        ])
        .then(([row,rows])=>{            
            rows.map((it,index)=>{                      
                sucursalItemService.verifiStock(it.productoId,row.sucursalId)
                    .then((itt)=>{                        
                        if(!itt){
                            let newStock = {
                                stock : it.cantidad,    
                                sucursalId : row.sucursalId,   
                                costo : parseInt(it.cantidad) * parseFloat(it.valor),                              
                                gestion : gestion,
                                mes : mes,
                                productoId: it.productoId,
                                valor: it.valor,
                                categoria: it.categoria,
                                marca: it.marca                    
                            }
                            sucursalItemService.create(newStock)
                            console.log('create')
                        }else{
                            let newStock = {
                                stock : parseInt(itt.stock) + parseInt(it.cantidad), 
                                sucursalId : row.sucursalId,    
                                costo : parseInt(itt.costo) + (parseInt(it.cantidad) * parseFloat(it.valor)), 
                                gestion : gestion,
                                mes : mes,                                
                                valor: it.valor,                                
                            }                                                        
                            sucursalItemService.update(newStock,itt.id)
                        }
                    })
                    return 0
            })

            /**Compras **/
           
            let newCompra = row
            newCompra.estado = 'aprobado'
            newCompra.fechaAprobacion = fechaCompra            
            compraService.update(newCompra,req.params.id)
            .then((xrow)=>{
                let xnota = {
                    "ncuotas"          : 1, 
                    "tipo"             : "compra",
                    "monto"            : row.totalGeneral,
                    "gestion"          : gestion, 
                    "montoTotal"       : row.totalGeneral,
                    "pagoTotal"        : row.totalGeneral,
                    "saldoTotal"       : row.totalGeneral,
                    "fechaVencimiento" : fechaCompra,
                    "ivigencia"          : fechaCompra,
                    "fvigencia"          : fechaCompra,
                    "cuotas"           : 1,       
                    "compraId"         : row.id,                                            
                    "mes"              : mes,  
                    "usuarioId"        : row.usuarioId,                    
                    "mes"              : fechaHoy.getMonth()+1,
                    "gestion"          : gestion,
                    "isVenta"          : false                
                } 

                /**Start Nota */
                notaService.create(xnota)
                  .then((xs)=>{                    
                    let datx = {
                        "cuota": 1,
                        "fechaPago": fechaCompra,
                        "importe": row.totalGeneral,
                        "importe": row.totalGeneral,
                        "estado": 'pendiente',  
                        "mes": mes,
                        "notaId": xs.id,
                        "isVenta": false,
                        "gestion": gestion,
                      }
                      planPagoService.adds(datx)
                      .then((yplan)=>{
                        compraService.data(1,12,'id','desc')
                          .then((xrows) => { 
                            res.status(200).send({result: xrows})
                          })
                      })
                      .catch((reason) => {
                        console.log(reason)
                        res.status(400).send({ message: reason });
                      });

                  })
                  .catch((reason) => {
                    console.log(reason)
                    res.status(400).send({ message: reason });
                  });
                /**End Nota */

            })
            .catch((reason) => {
                console.log(reason)
                res.status(400).send({ message: reason });
            });

            /**End Compras */

        })
    }

    const  setUpdate =(req,res)=>{        
        const { item, items } = req.body                    
        compraItemService._delete(req.params.id)
        .then(()=>{
            Promise.all([compraService.update(item,req.params.id),compraItemService.create(items)])        
            .then(([row,rows])=>{            
                Promise.all([compraService.item(req.params.id),compraItemService.data(req.params.id)])
                    .then(([xrow,xrows]) => { 
                        res.status(200).send({ result: {"item": xrow, "items": xrows} });
                    })
                    .catch((reason) => {
                        res.status(400).send({ message: reason });
                    });
            })
            .catch((reason) => {
                res.status(400).send({ message: reason });
            });                       
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        }) 
            
    }
    //Revisado
    const  getItem =(req,res)=>{         
        Promise.all([
            compraService.item(req.params.id),
            compraItemService.data(req.params.id),
            notaService.getItemCompra(req.params.id)
        ])        
            .then(([item,items,nota])=>{ 
                console.log(nota)             
                if(nota)
                {
                  planPagoService.data(nota.id)
                    .then((xplan)=>{
                        res.status(200).send({result: {item:item,items:items,nota:nota,plan:xplan}}) 
                    })
                }else{
                    res.status(200).send({result: {item:item,items:items,nota:nota,plan:[]}}) 
                }                                
            })    
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })     
    }
    
    const  getData =(req,res)=>{       
        compraService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
            .then((rows)=>{
                res.status(200).send({result: rows})
            })
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })     
    }
    
    
    //Revisado
    const setCreate =(req,res)=>{  	    
        const { usuarioId } = req.body
        let d = new Date()
        let fechaHoy  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        let fechaAnio    = d.getFullYear()
        let fechaMes     = d.getMonth() + 1
        let newItem = {
            fechaCompra : fechaHoy,
            estado      : 'pendiente',
            nroPagos    : 0,        
            gestion     : fechaAnio,
            mes         : fechaMes,
            tipo        : 'compra',
            origen      : 'compra directa',
            total       : 0,
            totalGeneral: 0,
            nroItems    : 0,
            subTotal    : 0,       
            sucursalId  : 1,
            proveedorId : 1,
            usuarioId   : usuarioId,
            observaciones: 'Nueva compra....' + fechaHoy
        }        
        
        compraService.create(newItem)
            .then((row)=>{                
                compraService.data(1,12,'id','desc')
                .then((rows) => { 
                   res.status(200).send({ result: rows });
                })
                .catch((reason) => {
                    console.log(reason)          
                   res.status(400).send({ message: reason });
                });
                
            })
            .catch((reason)=>{   
                console.log(reason)         
                res.status(400).send({message: "error de registro"})
            })
    }
    
    const  setDelete =(req,res)=>{    
        compraItemService._delete(req.params.id)
            .then((row)=>{                
                compraService._delete(req.params.id)
                .then((xrow) => { 
                   compraService.data(1,12,'id','desc')
                   .then((xrows) => { 
                      res.status(200).send({ result: xrows  });
                   })
                   .catch((reason) => {
                    console.log(reason)
                      res.status(400).send({ message: reason });
                   });
                   
                })
                .catch((reason) => {
                    console.log(reason)
                   res.status(400).send({ message: reason });
                });
             
            })
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })    
    }
    
    const  getItems =(req,res)=>{
        compraService.items()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
    
    const  getSearch =(req, res)=>{     
      const { prop, value, values  } = req.body
      let ivalue = null
      let ivalues = null
      let iprop = 'observaciones'
      if(prop === 'proveedor'){           
        ivalues = verifiDBNull(value)
        ivalue  = verifiDBNull(0)
      }else{ 
        
        ivalue  = verifiDBNull(value)
        ivalues = verifiDBNull(0)
      }      
        compraService.search(iprop, ivalue,ivalues)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

module.exports={
    setUpdate,
    getItem,
    getData,
    setCreate,
    setDelete,
    getItems,
    getSearch,
    setAprobar
}

