import CategoriaService from "../services/CategoriaService";

class CCategoriaController { 

  static listas(req, res) {        
      Promise.all([CategoriaService.getAll(1,12,'nombre','ASC')]) 
        .then(([result]) => {
             res.status(200).send({ result: result });                
            })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  static lista(req, res) {        
    CategoriaService.lista() 
      .then((result) => {
           res.status(200).send({ result: result });                
          })        
      .catch((reason) => {  
        console.log(reason)        
        res.status(400).send({ reason });
      });   
}

  static add(req, res) {          
  Promise.all([CategoriaService.add(req.body)])
    .then(([resu]) => {            
        Promise.all([                    
          CategoriaService.getAll(1,12,'nombre','ASC')
            ]) 
            .then(([result]) => {
                res.status(200).send({ message:"registrado",result: result });
            })
        })        
    .catch((reason) => {          
     res.status(400).send({ message: reason.message });
    });   
  }

  static update(req, res) {          
    Promise.all([CategoriaService.update(req.body,req.params.id)])
      .then(([resu]) => {            
          Promise.all([                    
            CategoriaService.getAll(1,12,'nombre','ASC')
              ]) 
              .then(([result]) => {
                  res.status(200).send({ message:"registrado",result: result });
              })
          })        
      .catch((reason) => {          
       res.status(400).send({ message: reason.message });
      });   
    }

}


export default CategoriaController;
