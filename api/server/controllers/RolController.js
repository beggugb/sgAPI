import RolService from "../services/RolService";

class RolController { 

  static lista(req, res) {        
      Promise.all([RolService.getAll()]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }
}


export default RolController;
