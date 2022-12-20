import tareaService from "../services/TareaService";
const  getData=(req,res)=>{
        const {usuarioId, gstart, gend } = req.body       
        console.log(req.body)        

        tareaService.data(usuarioId,gstart,gend)
        .then((data) => { 
           res.status(200).send({ result: data  });
        })
        .catch((reason) => {
            console.log(reason)
           res.status(400).send({ message: reason });
        });
    }

    const setCreate=(req,res)=>{
        const {usuarioId , gstart, gend } = req.body        
        tareaService.create(req.body)
        .then((tarea) => { 
            tareaService.data(usuarioId , gstart, gend)
            .then((data) => { 
               res.status(200).send({ message:"tarea registrada", result:  data});
            })
            .catch((reason) => {
               res.status(400).send({ message: reason });
            });            
        })
        .catch((reason) => {
           res.status(400).send({ message: reason });
        });
    }

    const  getDelete=(req,res)=>{
        const { tareaId, usuarioId , gstart, gend } = req.body 
        tareaService._delete(tareaId) 
        .then((tarea) => { 
           tareaService.data(usuarioId,gstart, gend)
           .then((data) => { 
              res.status(200).send({ message:"tarea eliminada", result:data  });
           })
           .catch((reason) => {
              res.status(400).send({ message: reason });
           });
           
        })
        .catch((reason) => {
           res.status(400).send({ message: reason });
        });
        
    }  

    const  getItem=(req,res)=>{
        tareaService.item(req.params.id)
        .then((item) => { 
           res.status(200).send({ message:"tarea item" ,result: item });
        })
        .catch((reason) => {
           res.status(400).send({ message: reason });
        });
        
    }

    const  setUpdate=(req,res)=>{
        const { usuarioId, gstart, gend } = req.body
        tareaService.update(req.body,req.params.id)
        .then((tarea) => { 
           tareaService.data(usuarioId,gstart, gend)
           .then((data) => { 
              res.status(200).send({ message:"tarea actualizada" ,result: data });
           })
           .catch((reason) => {
		   console.log(reason)
              res.status(400).send({ message: reason });
           });
           
        })
        .catch((reason) => {
		console.log(reason)
           res.status(400).send({ message: reason });
        });
        
    }

    module.exports={
      getItem,
      getData,
      setUpdate,
      setCreate,               
      getDelete
  }

   
