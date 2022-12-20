import { verifiDBNull } from '../../functions/env'
import ventaService from "../services/ventaService.js"
import ventaItemService from "../services/ventaItemService"
import sucursalItemService from "../services/sucursalItemService"
import notaService from "../services/NotaService"
import planPagoService from "../services/PlanService"
import empresaService from "../services/EmpresaService"
import tdcService from "../services/tdcService"
/*import comprobanteController from "../controllers/comprobanteController"*/

const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const mes = fechaHoy.getMonth() + 1
const fechaVenta  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      

    const setAprobar= (req,res) => {
      const { plan, nroPagos, contado, banco, inicial, cuota, total } = req.body      
       tdcService.verificar()
       .then((xtdc)=> {
        console.log(xtdc)
        if(xtdc){                    
        Promise.all([
        ventaService.item(req.params.id),
        ventaItemService.data(req.params.id)    
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
                                stock : parseInt(itt.stock) - parseInt(it.cantidad), 
                                sucursalId : row.sucursalId,    
                                costo : parseInt(itt.costo) - (parseInt(it.cantidad) * parseFloat(it.valor)), 
                                gestion : gestion,
                                mes : mes,                                
                                valor: it.valor,                                
                            }                                                        
                            sucursalItemService.update(newStock,itt.id)
                        }
                    })
                    return 0
            })

            let newVenta = row
            newVenta.estado = 'aprobado'
            newVenta.fechaAprobacion = fechaVenta            
            ventaService.update(newVenta,req.params.id)
                .then((xrow)=>{
                    console.log(row)
                    /** */               
                    let xnota = {
                        "tipo"             :  nroPagos > 1 ? "credito": "contado",
                        "montoTotal"       :  row.totalGeneral,
                        "pagoTotal"        :  0,
                        "saldoTotal"       :  row.totalGeneral,
                        "fechaVencimiento" :  fechaVenta,
                        "cuotas"           :  nroPagos,       
                        "ventaId"         :  row.id,                
                        "isVenta"          :  false,                
                        "mes"              :  mes                  
                    }      
                    notaService.create(xnota)
                    .then((xs)=>{
                        let xplan = plan.map((it)=>{
                            const date = new Date(it.fechaPago);                          
                            let xdata={
                                cuota     : it.cuota,
                                monto     : it.monto,
                                estado    : false,
                                fechaPago : it.fechaPago,
                                notaId    : xs,
                                mes       : date.getMonth()+1,
                                gestion   : gestion,
                                isVenta   : true
                            }
                            return xdata;
                        })
                        planPagoService.create(xplan)
                        .then((yplan)=>{
                            ventaService.data(1,12,'id','desc')
                            .then((xrows) => { 
                                empresaService.item(1)
                                .then((xempresa)=>{
                                    /*
                                    if(xempresa.automatico)                                    {   
                                      comprobanteController.regVenta(newVenta.id,total,contado,banco,inicial,cuota,'Ingreso',newVenta.usuarioId,newVenta.observaciones)
                                      .then((xx)=>{
                                        res.status(200).send({result: xrows})
                                      })
                                      .catch((reason) => {     
                                        console.log(reason)                           
                                        res.status(400).send({ message: reason });                             
                                      });                                      
                                    }else{
                                        res.status(200).send({result: xrows})
                                    }
                                    */
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
                    })

                        
                    /***/    
                })                
        })
        .catch((reason) => {
            console.log(reason)
            res.status(400).send({ message: reason });
        });        
        //**/// */
        }else{
            res.status(400).send({ message: "tipo de cambio" })
        }
      })  
    }
    const  setUpdate =(req,res)=>{        
        const { item, items } = req.body              
        ventaItemService._delete(req.params.id)
        .then(()=>{
            Promise.all([ventaService.update(item,req.params.id),ventaItemService.create(items)])        
            .then(([row,rows])=>{            
                Promise.all([ventaService.item(req.params.id),ventaItemService.data(req.params.id)])
                    .then(([xrow,xrows]) => { 
                        res.status(200).send({ result: {"item": xrow, "items": xrows} });
                })
                .catch((reason) => {
                    res.status(400).send({ message: reason });
                });
            })                       
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        }) 
            
    }

    const  getItem =(req,res)=>{         
        Promise.all([
            ventaService.item(req.params.id),
            ventaItemService.data(req.params.id),
            notaService.itemSingle(req.params.id)
        ])        
            .then(([item,items,nota])=>{
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
        ventaService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
            .then((rows)=>{                
                res.status(200).send({result: rows})
            })
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })     
    }
    
    
    
    const setCreate =(req,res)=>{  
        const { usuarioId } = req.body
        let d = new Date()
        let fechaHoy  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        let fechaAnio    = d.getFullYear()
        let fechaMes     = d.getMonth() + 1

        let newItem = {
            fechaVenta : fechaHoy,
            estado      : 'pendiente',
            nroPagos    : 0,        
            gestion     : fechaAnio,
            mes         : fechaMes,
            tipo        : 'venta',
            origen      : 'venta directa',
            total       : 0,
            totalGeneral: 0,
            nroItems    : 0,
            subTotal    : 0,       
            sucursalId  : 1,
            clienteId   : 1,
            usuarioId   : usuarioId,
            observaciones: 'Nueva venta....' + fechaHoy
        }        
        ventaService.create(newItem)
            .then((row)=>{                
                ventaService.data(1,12,'id','desc')
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
        ventaItemService._delete(req.params.id)
            .then((row)=>{                
                ventaService._delete(req.params.id)
                .then((xrow) => { 
                   ventaService.data(1,12,'id','desc')
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
        ventaService.items()
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
        ventaService.search(iprop, ivalue,ivalues)
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

