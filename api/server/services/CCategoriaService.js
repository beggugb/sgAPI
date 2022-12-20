import database from "../src/models";

const { Categoria } = database;

class CCategoriaService {

  static getAll(pag,num,prop,orden) {  
    return new Promise((resolve, reject) => {
       let page = parseInt(pag);
       let der = num * page - num;
       Categoria.findAndCountAll({
         raw: true,
         nest: true,
         offset: der,
         limit: num,         
         order: [[prop, orden]],                
       })
         .then((categorias) =>
           resolve({
             paginas: Math.ceil(categorias.count / num),
             pagina: page,
             total: categorias.count,
             data: categorias.rows,
           })
         )
         .catch((reason) => reject(reason));
     });
   }
    
  static lista() {  
   return new Promise((resolve, reject) => {
      Categoria.findAll({
        attributes: [["id","value"],["nombre","label"]],
	      order: [['nombre','ASC']]
      })
        .then((categoria) =>
          resolve(categoria)
        )
        .catch((reason) => reject(reason));
    });
  }

  static add(newCategoria) {    
    return new Promise((resolve, reject) => {        
        Categoria.create(newCategoria)           
            .then((result) => {              
                resolve({ message: "success" })
            })
            .catch((reason) => {                
                reject({ message: reason.message })
              });           
        
   });
  }

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Categoria.update(dato, { where: { id: Number(datoId) } })
        .then((categoria) => resolve(categoria))
        .catch((reason) => reject(reason));
    });
  }
  
}

export default CategoriaService;
