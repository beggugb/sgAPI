import ArticuloService from "../services/ArticuloService";
import ProcesoService from "../services/ProcesoService";

class ArticuloController {
 

  static item(req, res) {                  
      Promise.all([ArticuloService.getItem(req.params.id)]) 
        .then(([Articulo]) => { res.status(200).send({ result: Articulo }); })        
        .catch((reason) => { res.status(400).send({ reason }); });   
  }

  static search(req, res) {                  
    const { nombre } = req.body
    Promise.all([ArticuloService.search(nombre)]) 
        .then(([resul]) => { res.status(200).send({ result: resul }); })        
        .catch((reason) => { res.status(400).send({ reason }); });   
  }

  static lista(req, res) {          
      Promise.all([ArticuloService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)]) 
        .then(([result]) => { res.status(200).send({ result: result }); })        
        .catch((reason)  => { res.status(400).send({ reason }); });   
  }

  static add(req, res) {            
      Promise.all([ArticuloService.add(req.body)])
      .then(([result]) => {            
          Promise.all([ ArticuloService.getAll(1,12,"nombre","ASC")]) 
              .then(([result]) => { res.status(200).send({ data: result }); })
          })        
      .catch((reason) => {             
       res.status(400).send({ message: reason.message });
      });   
}

  static registro(req, res) {
    Promise.all([ArticuloService.add(req.body)])
      .then(([result]) => { res.status(200).send({ result }); })
      .catch((reason) => { res.status(400).send({ message: reason.message }); });
 }

  static update(req, res) {
    Promise.all([ArticuloService.update(req.body, req.params.id)])
      .then(([articulo]) => {        
          res.status(200).send({ message:'Articulo actualizado', articulo });
        })
      .catch((reason) => {
	      console.log(reason)
        res.status(400).send({ message: reason.message, articulo: null });
      });
  }


  static delete(req, res) {
    Promise.all([ArticuloService.delete(req.params.id)])
      .then(([Articulo]) => {
        Promise.all([                    
          ArticuloService.getAll(1,12,"nombre","ASC")]) 
            .then(([result]) => {
                res.status(200).send({ message:'Articulo eliminado', data: result });
            })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }
  
}

export default ArticuloController;
