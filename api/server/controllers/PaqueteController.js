import PaqueteService from "../services/PaqueteService";

class PaqueteController { 

  static listas(req, res) {        
      Promise.all([PaqueteService.listas()]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static getAll(req, res) {        
    Promise.all([PaqueteService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
      .then(([result]) => {

           res.status(200).send({ result: result });                
          })        
      .catch((reason) => {          
        console.log(reason)
        res.status(400).send({ reason });
      });   
}
  static add(req, res) {        
	console.log(req.body)  
    Promise.all([PaqueteService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  PaqueteService.getAll(1,12,"nombre","ASC")
              ]) 
              .then(([resu]) => {
                  res.status(200).send({ result: resu });
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
}
 static borrar(req, res) {
        Promise.all([PaqueteService.del(req.params.id)])
            .then(([paquete]) => {
                Promise.all([PaqueteService.getAll(1,12,"nombre","ASC")])
                    .then(([paquetes]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${paquete} eliminado`, 'result': paquetes })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason.parent.message })
            })
    }

    static actualizar(req, res) {
	    console.log(req.body)
            Promise.all([PaqueteService.update(req.body, req.params.id)])
            .then(([paquete]) => {
                Promise.all([PaqueteService.getAll(1,12,"nombre","ASC")])
                    .then(([paquetes]) => {
                        res.status(200).json({ 'message': `Usuario ID: ${req.params.id} actualizado`, 'result': paquetes })
                    })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

   static item(req, res) {
        Promise.all([PaqueteService.getId(req.params.id)])
            .then(([result]) => {
                res.status(200).send({ result })
            })
            .catch(reason => {
                res.status(400).send({ 'message': reason })
            })
    }

}


export default PaqueteController;
