import NotaService from "../services/NotaService";
import PlanService from "../services/PlanService";
import CajaService from "../services/CajaService";
import CajaItemsService from "../services/CajaItemsService";
import PagoService from "../services/PagoService";
import MembresiaService from "../services/MembresiaService";

class PlanController {

  static update(req, res) {
    const { notaId, importe, membresia, usuarioId, cliente, vigencia } = req.body  
    console.log(notaId)
    console.log(importe)
    console.log(usuarioId)
    console.log(cliente)
    console.log(membresia)
    console.log(vigencia)
    console.log(req.params.id)
    
    const d = new Date()       
    const hora = d.getHours() +':'+ d.getMinutes()     
    var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]

    console.log(usuarioId)
    console.log(formatted)

    CajaService.verificarCaja(usuarioId,formatted)
      .then((caja) => {                      
           if(caja)
           {
            /*********PAGOS - NOTA********************* */
            let newPl = {}
                newPl.notaId = notaId                
                newPl.estado = "pagado"
                newPl.fechaPago = d 
                Promise.all([PlanService.update(newPl, req.params.id),
                  NotaService.item(notaId)])
                    .then(([pln, nota]) => {
                      const newNot = nota  
                        //newNota            
                        newNot.pagoTotal = parseFloat(nota.pagoTotal)+ importe
                        newNot.saldoTotal = parseFloat(nota.saldoTotal) - importe

                        //newPago
                        const newPag = {}
                        newPag.fechaPago = d
                        newPag.pagoTotal = importe
                        newPag.usuarioId = usuarioId
                        newPag.label = "pago membresia UsuarioId :" + usuarioId + "Paquete: "+ membresia
                        console.log(newPag.label)
                        /*2********************************************** */
                        Promise.all([PagoService.add(newPag),
                                     NotaService.update(newNot, notaId),
                                     PlanService.getAll(notaId)])
                                      .then(([rPago, rNota, rPlan]) => {  
                                        /*3************CAJAS*********** */
                                        const citem = {}
                                        citem.monto = importe
                                        citem.tipo = "ingreso"
                                        citem.label = "Pago membresia  " + membresia + "( Cliente: "+ cliente +" )"
                                        citem.estado = true
                                        citem.registro = formatted
                                        citem.cajaId = caja.id
                                        citem.membresia  = membresia
                                        citem.hora       = hora
                                        citem.vigencia   = vigencia
                                        CajaItemsService.add(citem)
                                          .then((icaja) => {                                               
                                          /*4******************************** */  
                                              const newCaja = caja                                        
                                              newCaja.montoIngreso = parseFloat(caja.montoIngreso) + importe
                                              newCaja.montoFinal = parseFloat(caja.montoFinal) +  importe
                                              Promise.all([
                                                CajaService.update(newCaja,caja.id),
                                                NotaService.item(notaId)])
                                                  .then(([resCaja,resNota]) => {
                                                  /*5***************************** */
                                                     //actualizamos membresia
                                                      const nmem = {}
                                                      nmem.id = resNota.membresiaId
                                                      nmem.estado = true   

                                                      MembresiaService.update(nmem,resNota.membresiaId)
                                                        .then((rr) => {            
                                                         res.status(200).send({ result:{ Nota: resNota, Plan: rPlan, Recibo: rPago }});
                                                      })
                                                      .catch((reason) => {
                                                        console.log(reason)
                                                        res.status(400).send({ message: reason.message });
                                                      });
                                                  /*5***************************** */
                                                  })     
                                                  .catch((reason) => {
                                                    console.log(reason)
                                                    res.status(400).send({ message: reason.message });
                                                  }); 
                                          /*4******************************** */
                                          })
                                          .catch((reason) => {
                                            console.log(reason)
                                            res.status(400).send({ message: reason.message });
                                          });
                                        /*3**************************** */
                                      })
                                      .catch((reason) => {
                                        console.log(reason)
                                        res.status(400).send({ message: reason.message });
                                      });
                        /*2********************************************** */

                    })
                    .catch((reason) => {
                      console.log(reason)
                      res.status(400).send({ message: reason.message });
                    });
            /****************************** */
           } else{
            res.status(400).send({ result :{message: "No tiene caja abierta" }});
           }
      })
  }
  
  static updates(req, res) {
    const { notaId, importe, usuarioId, membresia, vigencia } = req.body  
    const d = new Date()    
    const hora = d.getHours() +':'+ d.getMinutes()
    //Registro de plan
    Promise.all([PlanService.update(req.body, req.params.id),NotaService.item(notaId)])
      .then(([pln, nota]) => {           
        const dating = nota              
         dating.pagoTotal = parseFloat(nota.pagoTotal)+ importe
         dating.saldoTotal = parseFloat(nota.saldoTotal) - importe
        const pag = {}
          pag.fechaPago = d
          pag.pagoTotal = importe
          pag.usuarioId = usuarioId
          pag.label = "pago membresia UsuarioId :" + usuarioId
          pag.membresia  = membresia
          pag.hora       = hora
          pag.vigencia   = vigencia

          //Actualiza Nota
          Promise.all([NotaService.update(dating, notaId),PlanService.getAll(notaId),PagoService.add(pag)])
            .then(([not, planes, pagu]) => {                            
              /*CAJA*/
              Promise.all([CajaService.verificarCaja(usuarioId)])
              .then(([caja]) => {            
                const citem = {}
                citem.monto = importe
                citem.tipo = "ingreso"
                citem.label = "pago membresia" + usuarioId
                citem.estado = true
                citem.cajaId = caja.id
                Promise.all([CajaItemsService.add(citem)])
                  .then(([icaja]) => {            
                    const newCaja = caja                                        
                    newCaja.montoIngreso = parseFloat(caja.montoIngreso) + importe
                    newCaja.montoFinal = parseFloat(caja.montoFinal) + importe                                    
                    
                    Promise.all([CajaService.update(newCaja,caja.id),NotaService.item(notaId)])
                      .then(([cc,nn]) => {
                        const nmem = {}
                        nmem.id = nn.membresiaId
                        nmem.estado = true                   
                        
                        Promise.all([MembresiaService.update(nmem,nn.membresiaId)])
                          .then(([rr]) => {            
                              res.status(200).send({ Nota: nn, Plan: planes });
                     })
                  })   
              })  
              /*END CAJA*/                
            })        
         })
       }) 
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }
    
}

export default PlanController;
