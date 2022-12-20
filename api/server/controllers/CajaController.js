import CajaService from "../services/CajaService";
import CajaItemsService from "../services/CajaItemsService";

class CajaController { 

  static add(req, res) {     //verificar
    const { usuarioId } = req.body
    let d     = new Date()
    let fcaja = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 

    CajaService.verificarCaja(usuarioId,fcaja)
    .then((xcaja) => {
      if(xcaja){
        CajaService.getAllUsuario(1,12,"registro","DESC",usuarioId)          
          .then((xcajas) => {                                  
            res.status(200).send({result: xcajas, message:"Tiene caja abierta" });                        
          })
      }else{
        let iok = req.body
        iok.registro = fcaja
        CajaService.add(iok)
        .then((xitem)=>{
          CajaService.getAllUsuario(1,12,"registro","DESC",usuarioId)          
            .then((xcajas) => {                      
                res.status(200).send({result: xcajas, message:"Caja registrada" });                        
            }) 
            .catch((reason) => {              
              console.log(reason)
              res.status(400).send({ message: reason });
            });
        })
      }   
    })
  }

  static listadetalle(req, res) {        //verificado
    CajaService.getAllUsuario(req.params.page,req.params.num,"createdAt","DESC",req.params.id) 
      .then((result)  => { res.status(200).send({ result: result }); })        
      .catch((reason) => { res.status(400).send({ reason }); });   
  }

  static update(req, res) {   //verificar
    const d = new Date()
    const io = req.body
    const { usuarioId } = req.body		
    io.fechaCierre = d
    CajaService.update(io, req.params.id)
      .then((caja) => {
        CajaService.getAllUsuario(1,12,"registro","DESC",usuarioId)
          .then((cajas)=> { res.status(200).send({ message:'Caja actualizada', result: cajas}); })
      })  
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }  

  static item(req, res) {      //verificar    
      Promise.all([CajaService.item(req.params.id),CajaItemsService.getAllCaja(1,12,"id","DESC",req.params.id)])
        .then(([cajau,itemsu]) => {
          res.status(200).send({ result:{cajau, itemsu}});    
        })  
        .catch((reason) => {
          res.status(400).send({ message: reason.message, cliente: null });
        });
  }

  static items(req, res) {   //verificar
    Promise.all([CajaService.item(req.params.id),CajaItemsService.getItemsCaja(req.params.id)])
        .then(([cajau,itemsu]) => { res.status(200).send({ result:{cajau, itemsu}}); })
        .catch((reason)        => { res.status(400).send({ message: reason.message, cliente: null });   });
    }

}


export default CajaController;
