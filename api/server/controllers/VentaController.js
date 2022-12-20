import { monthsShort } from "moment-timezone";
import VentaService from "../services/VentaService"
import VentaItemsService from "../services/VentaItemsService"
import CajaService from "../services/CajaService"
import CajaItemsService from "../services/CajaItemsService";
import fFecha from "../utils/fFecha"

class VentaController {

  static add(req, res) {      
    const d = new Date()
    const {item, items } = req.body

    /*Promise.all([CajaService.verificarCaja(item.usuarioId)])*/
    Promise.all([CajaService.getItem(item.usuarioId)])
    .then(([caja]) => {                  
      var dd = caja ? new Date(caja.createdAt) : new Date('2020-01-01 03:24:55.528-04') 
      var fcaja = (new Date(dd + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
      var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]         
      if(fcaja !== formatted){      
        res.status(400).send({ result :{message: "No tiene caja abierta" }});
      }else{
      /****************************************************************/  
      Promise.all([VentaService.add(item)]) 
      .then(([result]) => {          
          let vitems = Array()          
          for (var i = 0, max = items.length; i < max; i += 1) {    
              let dat = {}
              dat.monto = items[i].precioTotal
              dat.tipo = "Venta"
              dat.label = 'tpv'
              dat.estado = true
              dat.ventaId = result.Venta.id
              dat.articuloId = items[i].articuloId
              vitems.push(dat)
          }
          Promise.all([VentaItemsService.add(vitems)]) 
          .then(([resuli]) => {       
                /////////*****////////
                const citem = {}
                citem.monto = item.montoTotal
                citem.tipo = "ingreso tpv"
                citem.label = "pago punto de venta"
                citem.estado = true
                citem.cajaId = caja.id
                Promise.all([CajaItemsService.add(citem)])
                        .then(([icaja]) => {                           
                          const newCaja = caja                                        
                          newCaja.montoIngreso = parseFloat(caja.montoIngreso) + item.montoTotal
                          newCaja.montoFinal = parseFloat(caja.montoFinal) +  item.montoTotal

                          Promise.all([CajaService.update(newCaja,caja.id)])
                          .then(([resCaja]) => {
                            res.status(200).send({ icaja, result, resuli});
                          })     
                })
          })        
              
      })        
      .catch((reason) => {          
	      res.status(400).send({ reason });
      });
       /****************************************************************/   
     }  
   })
 }

}
export default VentaController;
