import ClienteService from "../services/ClienteService";
import MembresiaService from "../services/MembresiaService";
import CajaService from "../services/CajaService";
import PagoService from "../services/PagoService";
import RegistroService from "../services/RegistroService";
import compraService from "../services/compraService"
import sucursalService from "../services/sucursalService"
import sucursalItemService from "../services/sucursalItemService"
import ventasService from "../services/ventaService"
import moment from 'moment'

class InformesController {

 static indexar(req, res) {    
    Promise.all([MembresiaService.getTodus(req.params.inicio,req.params.fin)])
      .then(([data]) => {
	Promise.all(data.map(item => MembresiaService.todu(item,item.id)))
         .then(item =>{
         /*  let tasas = ordenars(companias,item,cotizacion.valor)*/
           res.status(200).send({ result: "OK"})
 /*         console.log(item)		 */
        })      
      })
      .catch((reason) => {
	      console.log(reason)
        res.status(400).send({ message: reason });
      });
  }
	 
static clientes(req, res) {    
    const { desde, hasta } = req.body;   
    console.log(desde)    
    console.log(hasta)  
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)  

    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    
    console.log(fdesde)    
    console.log(fhasta)    
    console.log('*************')    

    Promise.all([ClienteService.reporte(fdesde, fhasta)])
      .then(([data]) => {
        res.status(200).send({ result: {detalle: data.total, data: data } });
      })
      .catch((reason) => {
	      console.log(reason)
        res.status(400).send({ message: reason });
      });    
  }

  static membresias(req, res) {   
    const { desde, hasta, usuarioId } = req.body;          

    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)


    
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]

    Promise.all([MembresiaService.total(fdesde,fhasta,usuarioId),
	    	 MembresiaService.totalDetalle(fdesde,fhasta,usuarioId)])
      .then(([dat,datas]) => {
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {
         console.log(reason)
        res.status(400).send({ message: reason });
      });    
  }

  static cajas(req, res) {    
    const { desde, hasta, usuarioId } = req.body;   
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)  

    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    
    console.log(fdesde)    
    console.log(fhasta)

    Promise.all([CajaService.total(desde,hasta,usuarioId),CajaService.totalDetalle(fdesde,fhasta,usuarioId)])
    .then(([dat,datas]) => {
      res.status(200).send({ result: { detalle: dat.total, data: datas} });
    })
    .catch((reason) => {
      res.status(400).send({ message: reason });
    });    
}

  static pagos(req, res) {    
    const { usuarioId, start, end } = req.body;       
    const { desde, hasta } = req.body;       
    Promise.all([PagoService.total(desde,hasta),PagoService.totalDetalle(desde,hasta)])
    .then(([dat,datas]) => {
      res.status(200).send({ result: { detalle: dat, data: datas} });
    })
    .catch((reason) => {
      res.status(400).send({ message: reason });
    });  
  }

  static ventas(req, res) {         
    const { desde, hasta,usuarioId } = req.body;    
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)
    
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    
    console.log(fdesde)
    console.log(fhasta)
    Promise.all([ventasService.total(fdesde,fhasta,usuarioId),ventasService.totals(fdesde,fhasta,usuarioId)])
      .then(([dat,datas]) => {        
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ message: reason });
      });    
  }


  static consolidado(req, res) {         
    const { desde, hasta,usuarioId } = req.body;    
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)
    
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    
    
    Promise.all([MembresiaService.total(fdesde,fhasta,usuarioId),MembresiaService.totals(fdesde,fhasta,usuarioId)])
      .then(([dat,datas]) => {        
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {

        res.status(400).send({ message: reason });
      });    
  }
 
  static registro(req, res) { 
    const { desde, hasta } = req.body;
    console.log(desde)    
    console.log(hasta)  
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)  

    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
   
    RegistroService.reporte(fdesde, fhasta)
      .then((data) => {
        res.status(200).send({ result: {detalle: data.total, data: data } });
      })
      .catch((reason) => {
    
        res.status(400).send({ message: reason });
      });
  }
 
/******admininstrador***/
static amembresias(req, res) {
    const { desde, hasta } = req.body;
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)
    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]

    Promise.all([MembresiaService.atotal(fdesde,fhasta),
                 MembresiaService.atotalDetalle(fdesde,fhasta)])
      .then(([dat,datas]) => {
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {
         console.log(reason)
        res.status(400).send({ message: reason });
      });
  }





  static aconsolidado(req, res) { 
    const { desde, hasta } = req.body;
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)

    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]


    Promise.all([MembresiaService.atotal(fdesde,fhasta),MembresiaService.atotals(fdesde,fhasta)])
      .then(([dat,datas]) => {
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {

        res.status(400).send({ message: reason });
      });
  }

  static compras(req, res) { 
    const { desde, hasta } = req.body;
    var dDesde = new Date(desde)
    var dHasta = new Date(hasta)

    var fdesde = (new Date(dDesde + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]
    var fhasta = (new Date(dHasta + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]


    Promise.all([compraService.total(fdesde,fhasta),compraService.totales(fdesde,fhasta)])
      .then(([dat,datas]) => {
        res.status(200).send({ result: { detalle: dat.total, data: datas} });
      })
      .catch((reason) => {
        console.log(reason)  
        res.status(400).send({ message: reason });
      });
  }

/**********************/
static existencias(req, res) {
  const { productoId, categoriaId } = req.body;        

  sucursalItemService.getDetalle(productoId,categoriaId)
  .then((detallex) => {        
    let sumaTotal  = 0      
    let detalle = detallex.data.map((item,index)=>{
      let iok = {
      "id"           : item.producto.id,
      "codigo"       : item.producto.codigo,
      "nombre"       : item.producto.nombre,
      "precioVenta"  : item.producto.precioVenta,      
      "marca"        : item.producto.marca.nombre,
      "categoria"    : item.producto.categoria.nombre,
      "stock"        : item.stock,
      "costo"        : item.costo,
      "productoId"   : item.productoId
      }
      sumaTotal  = sumaTotal + parseFloat(item.producto.precioVenta)        
    return iok;
    })
    res.status(200).send({ result: { data:detalle, total:detallex.total, suma:sumaTotal } }); 
    })
    .catch((reason) => {         
      console.log(reason)
      res.status(400).send({ message: reason });
    });
}

  

}

export default InformesController;


   
