import sucursalItemService from '../services/sucursalItemService'
import { verifiDBNull, verifiDBEmpty } from '../../functions/env'

    const  getSearchItems =(req, res)=>{
        const { value, categoriaId  } = req.body
        let ivalue = verifiDBNull(value)           
    
          sucursalItemService.stock(ivalue, categoriaId)
          .then((rows)=>{  
                 
            let newItems = rows.map((it,index)=>{                
                let iok = {
                    "id"         : it.producto.id,
                    "productoId" : it.producto.id,
                    "nombre"     : it.producto.nombre,
                    "codigo"     : it.producto.codigo,
                    "filename"   : it.producto.filename,
                    "stock"      : it.stock,
                    "precioVenta" : it.producto.precioVenta,
                    "categoria"  : it.producto.categoria,
                    "marca"      : it.producto.marca,                    
                    "unidad"     : it.producto.unidad                    
                }
                return iok;
            })
         
            res.status(200).send({result: newItems })
          })
          .catch((reason)=>{
              console.log(reason)
              res.status(400).send({message: reason})
          })
      }

module.exports={        
        getSearchItems
    }