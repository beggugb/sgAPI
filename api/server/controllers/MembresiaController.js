import MembresiaService from "../services/MembresiaService";
import NotaService from "../services/NotaService";
import PlanService from "../services/PlanService";
import ClienteService from "../services/ClienteService"
import fFecha from "../utils/fFecha"
class MembresiaController {

  static add(req, res) {            //verificado
    const  { clienteId } = req.body
    var d       = new Date()    
    let fpago   = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var gestion = parseInt(d.getFullYear())    
   /* MembresiaService.getItem(clienteId)
      .then((xclient)=>{
        console.log(xclient)
        if(xclient.Membresia.estado){
          res.status(400).send({ message: "El usuario tiene activa una membresia" });
        }else{
            /*/
    MembresiaService.add(req.body)
    .then((result) => {             
        const nota =  {
          ncuotas     : result.Membresia.num,
          monto       : result.Membresia.ingresos,
          pagoTotal   : 0,
          saldoTotal  : result.Membresia.ingresos,
          gestion     : gestion,
          ivigencia   : d,
          fvigencia   : d,
          usuarioId   : result.Membresia.usuarioId,
          membresiaId : result.Membresia.id
        }  
        NotaService.add(nota)
          .then((nota) => {                                
              let datx = {
                cuota     :  1,
                importe   : parseFloat(nota.Nota.monto),
                estado    : 'pendiente',
                fechaPago : d,
                notaId    : nota.Nota.id 
              }
              Promise.all([PlanService.adds(datx),
                          MembresiaService.getAllClientes(1,12,clienteId),
                          MembresiaService.getIt(result.Membresia.id)])
                          .then(([resu, rem, dedu]) => {
                            MembresiaService.todu(dedu,dedu.id)
                              .then(([ok]) => {		
                                let resData = rem.data.map((item,index)=>{
                                  let iok = {
                                  "id"        : item.id,   
                                  "ivigencia" : item.ivigencia,
                                  "fvigencia" : item.fvigencia,
                                  "estado"    : item.estado,
                                  "est"       : fpago > item.fvigencia ? "vencido": "activo",
                                  "ingresos"  : item.ingresos,
                                  "paqueteId" : item.paqueteId,
                                  "intros"    : item.intros,
                                  "clienteId" : item.clienteId,
                                  "usuarioId" : item.usuarioId,
                                  "paquete"   : item.Paquete.nombre,
                                  "valor"     : item.Paquete.valor
                                  }
                                return iok;
                                }) 
                                let datas = {
                                  data: resData,
                                  total: rem.total,
                                  pagina: rem.pagina,
                                  paginas: rem.paginas
                                }
                                res.status(200).send({message:"membresias registrada", result: datas });
                                /*res.status(200).send({ message: 'Membresia registrada', result: rem });*/
                              })
                              .catch((reason) => {             
                                console.log(reason)
                               res.status(400).send({ message: reason.message });
                              });

                          })    
        })
        .catch((reason) => {             
          console.log(reason)
         res.status(400).send({ message: reason.message });
        });
    })
  .catch((reason) => {             
    console.log(reason)
   res.status(400).send({ message: reason.message });
  });    
  /** */
  }        


  static getItem(req, res) {   //verificado
    Promise.all([
      MembresiaService.getItem(req.params.id),     
      NotaService.getItem(req.params.id)	    
    ])
    .then(([mem,not]) => {      
	    Promise.all([PlanService.getAll(not.Nota.id)])
          .then(([pla]) => {
            res.status(200).send({ result: { mem, not,pla }});
          })			 
      })  
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ message: reason.message, cliente: null });
      });	   
  }

  static getDetalle(req, res) {  //verificado
    Promise.all([
      MembresiaService.getAllClientes(req.params.page,req.params.num,req.params.id),
      ClienteService.getItem(req.params.id)
    ])
    .then(([membresias,cliente]) => {
       res.status(200).send({ cliente: cliente, membresia: membresias });
    })
    .catch((reason) => {
      res.status(400).send({ message: reason.message, cliente: null });
    });
  }

  static update(req, res) {  //verificado
    MembresiaService.update(req.body,req,params.id)
      .then((itt)=>{
          MembresiaService.getAllClientes(1,12,req.params.id)
          .then((membresias) => {
            res.status(200).send({ membresia: membresias });
          })
          .catch((reason) => {
            res.status(400).send({ message: reason.message, cliente: null });
          });        
      })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }

  static updateMembresia(req, res) {  //verificado
    MembresiaService.update(req.body,req.params.id)
      .then((itt)=>{          
            MembresiaService.getItemo(req.params.id)                           
            .then((mem) => {                  
                  res.status(200).send({ result: mem });
                })			             
            .catch((reason) => {
              console.log(reason)
              res.status(400).send({ message: reason.message, cliente: null });
            });       
      })      
  }


 

  static listadetalle(req, res) {        //verificado
    let d = new Date()
    let fpago  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]  
    MembresiaService.getAllClientes(req.params.page,req.params.num,req.params.id) 
      .then((result)  => { 
        let resData = result.data.map((item,index)=>{
          let iok = {
          "id"        : item.id,   
          "ivigencia" : item.ivigencia,
          "fvigencia" : item.fvigencia,
          "estado"    : item.estado,
          "est"       : fpago > item.fvigencia ? "vencido": "activo",
          "ingresos"  : item.ingresos,
          "paqueteId" : item.paqueteId,
          "intros"    : item.intros,
          "clienteId" : item.clienteId,
          "usuarioId" : item.usuarioId,
          "paquete"   : item.Paquete.nombre,
          "valor"     : item.Paquete.valor
          }
        return iok;
        }) 
        let data = {
          data: resData,
          total: result.total,
          pagina: result.pagina,
          paginas: result.paginas
        }
        res.status(200).send({message:"membresias lista", result: data }); 
      })        
      .catch((reason) => {  res.status(400).send({ reason }); });   
  }

  static delete(req, res) {     //verificado
    let d = new Date()
    let fpago  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    Promise.all([NotaService.getItem(req.params.id),MembresiaService.getItem(req.params.id)])
      .then(([mo1,mo2]) => {	 
        PlanService.delete(mo1.Nota.id)
          .then((m1) => {
            NotaService.delete(req.params.id)
              .then((n2) => {
                  MembresiaService.delete(req.params.id)
                    .then((n3) => {
                      MembresiaService.getAllClientes(1,12,mo2.Membresia.clienteId)
                        .then((result) => {
                          let resData = result.data.map((item,index)=>{
                            let iok = {
                            "id"        : item.id,   
                            "ivigencia" : item.ivigencia,
                            "fvigencia" : item.fvigencia,
                            "estado"    : item.estado,
                            "est"       : fpago > item.fvigencia ? "vencido": "activo",
                            "ingresos"  : item.ingresos,
                            "paqueteId" : item.paqueteId,
                            "intros"    : item.intros,
                            "clienteId" : item.clienteId,
                            "usuarioId" : item.usuarioId,
                            "paquete"   : item.Paquete.nombre,
                            "valor"     : item.Paquete.valor
                            }
                          return iok;
                          }) 
                          let data = {
                            data: resData,
                            total: result.total,
                            pagina: result.pagina,
                            paginas: result.paginas
                          }
                          res.status(200).send({message:"membresias lista", result: data });
                        })
                    })
              })
          })    
      })	  
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
    }
  

static reporte(req, res) {        
  Promise.all([MembresiaService.getAllClientes(req.params.page,req.params.num,req.params.id)]) 
    .then(([result]) => {
         res.status(200).send({ result: result });                
        })        
    .catch((reason) => {          
      res.status(400).send({ reason });
    });   
}

static lista(req, res) {      //verificar     
  MembresiaService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)
    .then((result) => {
         res.status(200).send({ result: result });                
        })        
    .catch((reason) => {          
      res.status(400).send({ reason });
    });   
}

static searchMembresia(req, res) {     //verificar         
  const { nombres, page, num } = req.body	   
    MembresiaService.getAll(page,num, nombres) 
      .then((result)  => {         
          res.status(200).send({ result: result }); 
        })                
        .catch((reason) => {                      
          res.status(400).send({ message: reason.message });
         });   
}

static getIItem(req, res) {   //verificado  
    MembresiaService.getItemo(req.params.id)         
    .then((mem) => {          
      res.status(200).send({ result: mem });
        
    })  
    .catch((reason) => {
      console.log(reason)
      res.status(400).send({ message: reason.message, cliente: null });
    });	   
}


  

  
}
export default MembresiaController;
