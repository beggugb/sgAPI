/*import CajaService from "../services/CajaService";
/*import CajaService from "../services/CajaService";
import CajaItemsService from "../services/CajaItemsService";*/

import MembresiaService from "../services/MembresiaService";
import ClienteService from "../services/ClienteService";
import RegistroService from "../services/RegistroService";

class RegistroController { 
 
  static add(req, res) {        
    const { clienteId } = req.body    
    var d = new Date()
    Promise.all([ClienteService.getCI(clienteId)]) 
      .then(([cliente]) => {        
      if(cliente.Cliente){        
        Promise.all([RegistroService.getItem(cliente.Cliente.id)]) 
          .then(([cli]) => {
            var d         = new Date()
            var dd        = cli ? new Date(cli.createdAt) : new Date('2020-01-01 03:24:55.528-04') 
            var fcaja     = (new Date(dd + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
            var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]         
            if(fcaja === formatted)
            {
              res.status(200).send({ result:{bandera:2, message: "Ya tiene ingreso HOY", cliente: cliente.Cliente, membresia: null }});             
            }else{
              Promise.all([ MembresiaService.getItemClienteActivo(cliente.Cliente.id)]) 
                .then(([membresia]) => {                    
                    if(membresia.Membresia)
                    {
                      let dato = {}
                      dato.registro = d
                      dato.tipo = "cliente"
                      dato.clienteId = cliente.Cliente.id
                      Promise.all([ RegistroService.add(dato)]) 
                        .then(([registro]) => { 
                            res.status(200).send({ result:{ bandera:1, message: "Acceso Correcto", cliente: cliente.Cliente, membresia: membresia.Membresia }});                                                                               
                        })    
                    }else{
                    res.status(200).send({ result:{bandera:2, message: "Sin Membresia", cliente: cliente.Cliente, membresia: null }});             
                    }
                })
            }
        }) 
      }else{
        res.status(200).send({ result:{bandera:3, message: "No existe cliente", cliente: null, membresia: null }}); 
      }        
      })        
    .catch((reason) => {          
      res.status(400).send({ reason });
    }); 
  }




}

export default RegistroController;
