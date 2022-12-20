import ClienteService from "../services/ClienteService";
import MembresiaService from "../services/MembresiaService";

class ClienteController {


  static getItems (req,res){
    categoriaService.items()
    .then((rows)=>{
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{        
        res.status(400).send({message: reason})
    })    
  }

  static lista(req, res) {      //verificar   
	  console.log('iokiii')
    ClienteService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)
      .then((result) => {
           res.status(200).send({ result: result });                
          })        
      .catch((reason) => {          
        res.status(400).send({ reason });
      });   
  }
/*
  static item(req, res) {  //verificar
    ClienteService.getItem(req.params.id) 
         .then((cliente) => {
              res.status(200).send({ result: {cliente: cliente, membresis: membresias} });                
          })        
      .catch((reason) => {                  
        res.status(400).send({ reason });
      });   
  }
*/
static item(req, res) {  //verificar
  let d = new Date()
  let fpago  = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
  ClienteService.getItem(req.params.id) 
       .then((cliente) => {
          if(req.params.tipo === 'unit')
          {
            res.status(200).send({ result: cliente });                
          }else if(req.params.tipo === 'inf'){
                MembresiaService.getAllClientes(1,24,req.params.id) 
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
                  res.status(200).send({result: { cliente:cliente, membresias: data} }); 
                }) 
                }else{
                  MembresiaService.getAllClientes(1,12,req.params.id) 
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
                    res.status(200).send({result: { cliente:cliente, membresias: data} }); 
                  })                  
               }     
              })                    
}

 /* static registro(req, res) {   //verificar
    const { ci } = req.body 
    ClienteService.add(req.body)
      .then((result)  => { res.status(200).send({ result }); })
      .catch((reason) => {
        res.status(400).send({ message: reason.message });
      });
  }*/

  static registro(req, res) {      //verificar
    const { ci } = req.body            
    ClienteService.verificar(ci)
      .then((row) => {          
          if(!row)
          {
            ClienteService.add(req.body)
              .then((result) => {                            
                 res.status(200).send({ result });                      
              })        
              .catch((reason) => {          
                res.status(400).send({ message: reason.message });
              });
          }else{            
            res.status(400).send({ message: "usuario existente con C.I." + ci });            
          }
        })           
  }

  static add(req, res) {      //verificar
    const { ci } = req.body            
    ClienteService.verificar(ci)
      .then((row) => {          
          if(!row)
          {
            ClienteService.add(req.body)
              .then((result) => {            
                ClienteService.getAll(1,12,"id","DESC")
                  .then((result) => { 
                      res.status(200).send({ data: result });  
                    })
              })        
              .catch((reason) => {          
                res.status(400).send({ message: reason.message });
              });
          }else{            
            res.status(400).send({ message: "usuario existente" });            
          }
        })           
  }

  static delete(req, res) {    
    ClienteService.delete(req.params.id)
      .then((cliente) => {
        ClienteService.getAll(1,12,"id","DESC") 
            .then((result) => {
                res.status(200).send({ message:'Cliente eliminado', result: result });
            })
            .catch((reason) => {              
              /*console.log(reason.original.detail)*/
              res.status(400).send({ message: reason });
            });
      })
      .catch((reason) => {                
        res.status(400).send({ message: reason.original.detail });
      });
  }
 
  static search(req, res) {     //verificar         
    const { nombres, ci, nit, page, num } = req.body	 
      ClienteService.search(page,num, nombres, ci, nit) 
        .then((result)  => { res.status(200).send({ result: result }); })                
          .catch((reason) => {                      
            res.status(400).send({ message: reason.message });
           });   
  }

  static update(req, res) {
    ClienteService.update(req.body, req.params.id)
      .then((cliente) => {
          res.status(200).send({ message:'Cliente actualizado', cliente });
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, cliente: null });
      });
  }

 
  
}

export default ClienteController;
