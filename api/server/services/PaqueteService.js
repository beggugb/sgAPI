import database from "../src/models";

const { Paquete } = database;

class PaqueteService {
    
  static getAll(pag,num,prop,orden) {  
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Paquete.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,
         order: [[prop, orden]]                 
       })
         .then((paquetes) =>
           resolve({
             paginas: Math.ceil(paquetes.count / num),
             pagina: page,
             total: paquetes.count,
             data: paquetes.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }
  
   static add(newPaquete) {    
    return new Promise((resolve, reject) => {
        if(newPaquete.nombre)
        {            
            Paquete.create(newPaquete)
            .then((paquete) => {                
                resolve({ message: "Paquete registrado", paquete:paquete })
            })
            .catch((reason) => {                
                reject({ message: reason.message, paquete: null })
              });
            
        }else{                
             reject({ message: "Datos faltantes", paquete: null })
        }        
   });
  } 

  static listas() {  
    return new Promise((resolve, reject) => {
       Paquete.findAll({
        attributes: [["id","value"],["nombre","label"],["valor","valor"],"diario","medio","meses"],      
        order: [['nombre','ASC']],
        where: { enabled: true }
       })
         .then((paquetes) =>
           resolve(paquetes)
         )
         .catch((reason) => reject(reason));
     });
   }

   static getId(PaqueteId) {
        return new Promise((resolve, reject) => {
            Paquete
                .findByPk(PaqueteId)
                .then(Paquete => resolve(Paquete))
                .catch(reason => reject(reason))
        })
    }

    static del(PaqueteId) {
        return new Promise((resolve, reject) => {
            Paquete
                .destroy({
                    where: { id: PaqueteId }
                })
                .then(Paquete => resolve(Paquete))
                .catch(reason => reject(reason))
        })
    }

    static update(dato, datoId) {
        return new Promise((resolve, reject) => {
            Paquete
                .update(dato, {
                    where: { id: datoId }
                })
                .then(Paquete => resolve(Paquete))
                .catch(reason => reject(reason))
        })
    }
	 

  
}

export default PaqueteService;
