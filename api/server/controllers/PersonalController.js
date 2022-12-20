import PersonalService from "../services/PersonalService";

class PersonalController {
 

  static item(req, res) {  
               
      Promise.all([PersonalService.getItem(req.params.id)]) 
           .then(([Personal]) => {
                res.status(200).send({ result: Personal });                
            })        
        .catch((reason) => {                  
          res.status(400).send({ reason });
        });   
  }

  static search(req, res) {              
    const { nombres, ci, nit } = req.body
      Promise.all([PersonalService.search(nombres, ci, nit)]) 
           .then(([result]) => {
                res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
		
          res.status(400).send({ reason });
        });   
  }

  static lista(req, res) {        
      Promise.all([PersonalService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  static add(req, res) {        
    
    Promise.all([PersonalService.add(req.body)])
      .then(([result]) => {            
          Promise.all([                    
                  PersonalService.getAll(1,12,"nombres","ASC")
              ]) 
              .then(([result]) => {
                  res.status(200).send({ data: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
}

  static registro(req, res) {
    
    Promise.all([PersonalService.add(req.body)])
      .then(([result]) => {
           res.status(200).send({ result });
          })
      .catch((reason) => {
        res.status(400).send({ message: reason.message });
      });
 }

  static update(req, res) {
    Promise.all([PersonalService.update(req.body, req.params.id)])
      .then(([Personal]) => {
          res.status(200).send({ message:'Personal actualizado', Personal });
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, Personal: null });
      });
  }

  static delete(req, res) {
    Promise.all([PersonalService.delete(req.params.id)])
      .then(([Personal]) => {
        Promise.all([                    
          PersonalService.getAll(1,12,"nombres","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Personal eliminado', data: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}

export default PersonalController;
