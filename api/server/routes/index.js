import KeyToken from './keyToken'
import usuarioRoutes from './UsuarioRoutes'
import tareaRoutes from './TareasRoutes'
import clienteRoutes from './ClientesRoutes'
import empresaRoutes from './EmpresasRoutes'
import rolRoutes from './RolesRoutes'
import paquetesRoutes from './PaquetesRoutes'
import membresiasRoutes from './MembresiasRoutes'
import planesRoutes from './PlanesRoutes'
import filesRoutes from './FilespRoutes'
import cajasRoutes from './CajasRoutes'
import cajasItemsRoutes from './CajasItemsRoutes'
import registrosRoutes from './RegistroRoutes'
import informesRoutes from './InformesRoutes'
import categorias from './categoriaRoute'
import marcas from './marcaRoute'
import tipo from './tipoRoute'
import unidad from './unidadRoute'
import volumen from './volumenRoute'
import modelo from './modeloRoute'
import origen from './origenRoute'
import sucursal from './sucursalRoute'
import industria from './industriaRoute'
import productos from './productoRoute'
import compra from './compraRoute'
import proveedor from './proveedorRoute'
import venta from './ventaRoute'
import stock from './stockRoute'
import file from './fileRoute'
import tpvs from './tpvRoutes'
import memRoutes from './MemRoutes'

export default (app) => {
        app.use('/api/usuarios',usuarioRoutes);                
        app.use('/api/tareas', tareaRoutes);                
        app.use('/api/clientes', clienteRoutes);
        app.use('/api/empresas', empresaRoutes);
		app.use('/api/roles',KeyToken,rolRoutes);
        app.use('/api/paquetes',paquetesRoutes);
        app.use('/api/membresias',membresiasRoutes);
		app.use('/api/mem',memRoutes);
        app.use('/api/planes',planesRoutes);
        app.use('/api/files',filesRoutes);        
        app.use('/api/file',file);
        app.use('/api/cajas',cajasRoutes);
        app.use('/api/cajasitems',cajasItemsRoutes); 
        app.use('/api/registros',registrosRoutes);        
        app.use('/api/informes',informesRoutes);        		
		app.use('/api/categorias',categorias)
		app.use('/api/marcas',marcas)
		app.use('/api/tipos',tipo)
		app.use('/api/unidades',unidad)
		app.use('/api/volumenes',volumen)
		app.use('/api/modelos',modelo)
		app.use('/api/origenes',origen)
		app.use('/api/sucursales',sucursal)
		app.use('/api/industrias',industria)
		app.use('/api/productos',productos)
		app.use('/api/compras',compra)
		app.use('/api/proveedores',proveedor)
		app.use('/api/ventas',venta)
		app.use('/api/stock',stock)
		app.use('/api/tpv',tpvs)
}
