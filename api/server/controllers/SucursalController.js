import SucursalService from "../services/SucursalService";

class SucursalController {
 

  static item(req, res) {                  
      Promise.all([SucursalService.getItem(req.params.id)]) 
           .then(([Sucursal]) => {
                res.status(200).send({ result: Sucursal });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }
  
  static lista(req, res) {        
      Promise.all([SucursalService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
  static listas(req, res) { 
      Promise.all([SucursalService.lista()])
        .then(([result]) => {
             res.status(200).send({ result: result });
            })
        .catch((reason) => {
          res.status(400).send({ reason });
        });
  }


  static add(req, res) {        
    Promise.all([SucursalService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  SucursalService.getAll(1,12,"nombre","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message: 'Sucursal registrada',result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

static update(req, res) {
    Promise.all([SucursalService.update(req.body, req.params.id)])
      .then(([sucursal]) => {
        Promise.all([ SucursalService.getAll(1,12,"nombre","ASC")]) 
          .then(([sucursales]) => {
              res.status(200).send({ message:'Sucursal actualizada', result: sucursales });
          })
        })    
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Sucursal: null });
      });
  }

  static delete(req, res) {
    Promise.all([SucursalService.delete(req.params.id)])
      .then(([Sucursal]) => {
        Promise.all([                    
          SucursalService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Sucursal eliminada', result: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}


export default SucursalController;
