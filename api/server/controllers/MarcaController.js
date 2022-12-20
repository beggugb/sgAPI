import MarcaService from "../services/MarcaService";

class MarcaController { 

  static lista(req, res) {        
      Promise.all([MarcaService.getAll()]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
}


export default MarcaController;
