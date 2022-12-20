const db = require('../src/models');
const sequelize = require('sequelize');

const sharp = require('sharp')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'api/public/images/trash')
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+ '-'+ file.originalname)
    }
})

var upload = multer({storage: storage}).single('file')


const proveedor = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/proveedores/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 250}).toFile('./api/public/images/proveedores/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 120}).toFile('./api/public/images/proveedores/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const cliente = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/clientes/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 250}).toFile('./api/public/images/clientes/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 120}).toFile('./api/public/images/clientes/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const producto = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/productos/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 250}).toFile('./api/public/images/productos/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 120}).toFile('./api/public/images/productos/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const empresa = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/empresas/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 250}).toFile('./api/public/images/empresas/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 120}).toFile('./api/public/images/empresas/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

module.exports={
    producto,
    cliente,
    empresa,
    proveedor
}
