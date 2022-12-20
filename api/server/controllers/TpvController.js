import ArticuloService from "../services/ArticuloService";
import CajaService from "../services/CajaService";
import CajaItemsService from "../services/CajaItemsService";
import VentaService from "../services/ventaService"
import VentaItemService from "../services/ventaItemService"
import NotaService from "../services/NotaService";
import PlanService from "../services/PlanService";
import SucursalItems from "../services/sucursalItemService"

class TpvController {
 
  static listas(req, res) {      
 
      Promise.all([ArticuloService.getAllCategorias(req.params.page,req.params.num,req.params.categoria)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  static crear(req, res) {        
    const { item, items } = req.body          

    let d = new Date()
    let fechaVenta   = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    let fechaAnio    = d.getFullYear()
    let fechaMes     = d.getMonth() + 1

      
    const hora = d.getHours() +':'+ d.getMinutes()     
    var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]

    CajaService.verificarCaja(item.usuarioId,formatted)
      .then((caja) => {                   
           if(caja)
           {
            let fventa = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
                let zventa = item
                zventa.fechaVenta = fechaVenta                
                zventa.fechaAprobacion = fechaVenta                
                zventa.tipo       = 'venta'                                
                zventa.nroPagos   = 1
                zventa.estado     = 'cerrado' 
                zventa.origen     = 'venta directa tpdv'
                zventa.gestion    = fechaAnio
                zventa.mes        = fechaMes
              VentaService.create(zventa)
              .then((xventa)=>{
                /*res.status(200).send({ result : xventa}); */
                let newItems = items.map((it,index)=>{
                  let iok = {
                      "ventaId"    : xventa.id,
                      "cantidad"   : it.cantidad,  
                      "codigo"     : it.codigo,
                      "valor"      : parseFloat(it.valor),
                      "categoria"  : it.categoria,
                      "marca"      : it.marca,
                      "productoId" : it.productoId,
                      "gestion"    : fechaAnio,
                      "mes"        : fechaMes,
                      "subTotal"   : it.subTotal,
                      "unidad"     : it.unidad
                  }
                  return iok;
              })
                /*res.status(200).send({ result : newItems}); */
                /**Ventas */
                VentaItemService.create(newItems)
                .then((xx)=>{
                  let xnota = {
                    "ncuotas"     : 1,
                    "monto"       : item.totalGeneral,
                    "pagoTotal"   :  item.totalGeneral,
                    "saldoTotal"  :  0,
                    "gestion"     : fechaAnio,
                    "ivigencia"   : fechaVenta,
                    "fvigencia"   : fechaVenta,                    
                    "isVenta"     :  true,                
                    "tipo"        : "venta",
                    "usuarioId"   : item.usuarioId,
                    "ventaId"     : xventa.id,
                    }

                    /**Nota */
                    NotaService.create(xnota)
                    .then((znota)=>{
                      /*res.status(200).send({ message: znota });*/
                      let xplan={
                        cuota     : 1,
                        monto     : item.totalGeneral,
                        estado    : true,
                        fechaPago : fechaVenta,
                        fechaPagado : fechaVenta,
                        notaId    : znota.id,
                        mes       : d.getMonth()+1,
                        gestion   : fechaAnio,
                        isVenta   : true
                      }
                      /**plan */
                      PlanService.adds(xplan)
                      .then((zplan)=>{
                        /**Inventario */
                        items.map(xt=>{                                    
                          SucursalItems.verifiStock(xt.productoId,1)
                          .then((xite)=>{                                                                             
                            if(xite)
                            {
                              let dt = xite                                  
                                  dt.stock = xite.stock > 0 ? parseInt(xite.stock) - parseInt(xt.cantidad) : xite.stock                                                       
                                  SucursalItems.update(dt, xite.id)
                                    .then((iok)=>{ console.log('actualizado')})                                                            
                            }
                          }) 
                          return;     
                        })          
                        /**Inventario */

                                                /*res.status(200).send({ message: zplan });*/
                                                const citem = {}
                                                citem.monto = item.totalGeneral
                                                citem.tipo = "ingreso"
                                                citem.label = "Venta TPVD", 
                                                citem.estado = true
                                                citem.registro = formatted
                                                citem.cajaId = caja.id
                                                citem.membresia  = "Punto de Venta"
                                                citem.hora       = hora
                                                citem.vigencia   = fechaVenta
                                                /**Cajas */
                                                CajaItemsService.add(citem)
                                                  .then((icaja) => {
                                                    const newCaja = caja                                        
                                                    newCaja.montoIngreso = parseFloat(caja.montoIngreso) + item.totalGeneral
                                                    newCaja.montoFinal = parseFloat(caja.montoFinal) +  item.totalGeneral
                                                    CajaService.update(newCaja,caja.id)
                                                      .then((xzcaja)=>{
                                                        let nus = "%";
                                                        SucursalItems.stock(nus, item.categoriaId)
                                                        .then((rows)=>{               
                                                          let newItems = rows.map((it,index)=>{                
                                                              let iok = {
                                                                  "id"         : it.producto.id,
                                                                  "nombre"     : it.producto.nombre,
                                                                  "codigo"     : it.producto.codigo,
                                                                  "filename"   : it.producto.filename,
                                                                  "stock"      : it.stock,
                                                                  "precioVenta" : it.producto.precioVenta,
                                                                  "categoria"  : it.producto.categoria,
                                                                  "marca"      : it.producto.marca,                    
                                                                  "unidad"     : it.producto.unidad                    
                                                              }
                                                              return iok;
                                                          })
                                                          res.status(200).send({result: newItems })
                                                        })
                                                        .catch((reason)=>{
                                                            console.log(reason)
                                                            res.status(400).send({message: reason})
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
                                          /**Cajas */           

                      })
                      .catch((reason) => {   
                        console.log(reason)                         
                        res.status(400).send({ message: reason });
                      });

                      /**plan */
                    })
                    .catch((reason) => {   
                      console.log(reason)                         
                      res.status(400).send({ message: reason });
                    });
                    /**Nota */
                })
                .catch((reason) => {   
                  console.log(reason)                         
                  res.status(400).send({ message: reason });
                });
                /**Ventas */

              })
              .catch((reason) => {   
                console.log(reason)                         
                res.status(400).send({ message: reason });
              });

           }else{
            res.status(400).send({message: "No tiene caja abierta" }); 
           }
          })  
          .catch((reason) => {   
            console.log(reason)                         
            res.status(400).send({ message: reason });
          }); 
     }  

  
}

export default TpvController;
