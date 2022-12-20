import CajaItemsService from "../services/CajaItemsService";
import CajaService from "../services/CajaService";

class CajaItemController { 
 
  static add(req, res) {        //verificado
    const { cajaId, tipo, monto } = req.body
    let d      = new Date()
    const hora = d.getHours() +':'+ d.getMinutes() 
    let fcaja  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 

    CajaService.item(cajaId)
      .then((caja) => {            
        let xbody =   req.body
        xbody.registro = fcaja
        xbody.membresia  = 'ingreso manual'
        xbody.hora       = hora
        xbody.vigencia   = 'ingreso manual'
        CajaItemsService.add(xbody)
            .then((icaja) => {
                const newCaja = caja                                        
                if(tipo === 'ingreso'){
                    newCaja.montoIngreso = parseFloat(caja.montoIngreso) + monto
                    newCaja.montoFinal = parseFloat(caja.montoFinal) + monto
                }else{
                    newCaja.montoEgreso = parseFloat(caja.montoEgreso) + monto
                    newCaja.montoFinal = parseFloat(caja.montoFinal) - monto
                }                
                CajaService.update(newCaja,caja.id)
                    .then((resCaja) => {
                        Promise.all([CajaService.item(cajaId),CajaItemsService.getAllCaja(1,12,"id","DESC",cajaId)])
                            .then(([caja, items]) => {
                                res.status(200).send({ result:{caja, items }});
                          })            
                    })
                })      
            })        
        .catch((reason) => {          
        res.status(400).send({ message: reason.message });
        });
  }

    static listadetalle(req, res) {        //verificar
        CajaItemsService.getAllCaja(req.params.page,req.params.num,"id","DESC",req.params.id) 
           .then((result)   => { res.status(200).send({ result: result }); })        
            .catch((reason) => { res.status(400).send({ reason }); });   
    }

}


export default CajaItemController;
