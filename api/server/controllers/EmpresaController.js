import EmpresaService from "../services/EmpresaService";

class EmpresaController {
 

  static item(req, res) {                  
      Promise.all([EmpresaService.getItem(req.params.id)]) 
           .then(([empresa]) => {
                res.status(200).send({ result: empresa });                
            })        
        .catch((reason) => {                         
          res.status(400).send({ reason });
        });   
  }

  static update(req, res) {
    Promise.all([EmpresaService.update(req.body, req.params.id)])
      .then(([result]) => {
        Promise.all([EmpresaService.getItem(req.params.id)])
            .then(([empresa]) => {
              res.status(200).send({ message:'Empresa actualizada', result: empresa });
        })
      })  
      .catch((reason) => {
        res.status(400).send({ message: reason.message, empresa: null });
      });
  }
  
}

export default EmpresaController;
