import ClienteService from "../services/ClienteService";
import FilesService from "../services/FilesService";
import ArticuloService from "../services/ArticuloService";

class FilesController {
 

  static clientes(req, res) {  

    Promise.all([FilesService.clientes(req, res)])
      .then(([file]) => {
	 console.log(file)     
        const art = {}
        art.filename = file.filename
        Promise.all([ClienteService.update(art, req.params.id)])
          .then(([result]) => {
                res.status(200).send({ result })
          })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
	  
  }

  static articulos(req, res) {      
     Promise.all([FilesService.articulos(req, res)])
       .then(([file]) => {
         const art = {}
         art.filename = file.filename
         Promise.all([ArticuloService.update(art, req.params.id)])
           .then(([result]) => {
                 res.status(200).send({ result })
               })
       })
       .catch(reason => {
         
         res.status(400).send({ 'message': reason })
       })
     
   }

  
}

export default FilesController;
