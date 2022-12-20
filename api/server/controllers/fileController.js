import fileService from '../services/fileService'
import clienteService from '../services/ClienteService'
import productoService from '../services/productoService'
import empresaService from '../services/EmpresaService'
import usuarioService from '../services/UserService'
import proveedorService from '../services/proveedorService'


    const  proveedor=(req,res)=>{
        fileService.proveedor(req,res)
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            proveedorService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }
    const  cliente=(req,res)=>{
        fileService.cliente(req,res)
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            clienteService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }

    const  producto=(req,res)=>{
        fileService.producto(req,res)
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            productoService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }
    const  empresa=(req,res)=>{
        fileService.empresa(req,res)
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            empresaService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }

    const  usuario=(req,res)=>{
        fileService.usuario(req,res)
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            usuarioService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }

module.exports={
    cliente,
    usuario,
    producto,
    empresa,
    proveedor
}
