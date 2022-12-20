import UserService from "../services/UserService";
import ModuloService from "../services/ModuloService";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

class UserController {

 static login(req, res) {    //verificado
    const { username, password } = req.body;
    console.log(username)
    console.log(password)
    UserService.login(username, password)
      .then((user) => {      
            res.status(200).send({ user: user}); 
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }	

  static lista(req, res) {        //verificado
    UserService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden) 
      .then((result)  => { res.status(200).send({ result: result }); })        
      .catch((reason) => { res.status(400).send({ reason }); });   
  }

  static item(req, res) {  //verificado
    UserService.getItem(req.params.id) 
      .then((usuario) => { res.status(200).send({ result: usuario }); })
      .catch((reason) => { res.status(400).send({ message: reason.message, cliente: null });  });
  }

  static registro(req, res) {    //verificado
      UserService.add(req.body)
        .then((result) => {            
          UserService.getAll(1,12,"nombre","ASC") 
            .then((usuarios) => {
                    res.status(200).send({ result: usuarios });
                })
                .catch((reason) => {
                  console.log(reason)
                  res.status(400).send({ reason });
                });  
            })
        .catch((reason) => {
          console.log(reason)
          res.status(400).send({ reason });
        });   
  }

  static update(req, res) { //verificar
  const {bandera, password} = req.body 

  console.log(bandera)
  console.log(password)
  
  if(bandera === 'pin'){
    let it = req.body
    it.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    console.log(it.password)
    UserService.update(it, req.params.id)
      .then((usuario) => {
	      UserService.getAll(1,12,"nombre","ASC")
	        .then((usuarios) => {
            res.status(200).send({ message:'Usuario actualizado', result: usuarios });
       		 })
	    })  
      .catch((reason) => {
        res.status(400).send({ message: reason.message, usuarios: null });
      });
  }else{
    UserService.update(req.body, req.params.id)
      .then((usuario) => {
	      UserService.getAll(1,12,"nombre","ASC")
	        .then((usuarios) => {
            res.status(200).send({ message:'Usuario actualizado', result: usuarios });
       		 })
	    })  
      .catch((reason) => {
        res.status(400).send({ message: reason.message, usuarios: null });
      });
    }
      
  }

  static listas(req, res) { //verificar
    UserService.listas()
      .then((result)   => { res.status(200).send({ result: result });   })
      .catch((reason)  => { res.status(400).send({ reason });  });
  }

  static delete(req, res) {  //verificar
    UserService.delete(req.params.id)
      .then((user) => {
        UserService.getAll(1,12,"nombre","ASC") 
          .then((result) => {
                res.status(200).send({ message:'Usuario eliminado', data: result });
          })
        })
      .catch((reason) => {
        res.status(400).send({ message: reason.message, data: null });
      });
  }

  static search(req, res) {  //verificar            
      const { page, num, prop, orden, name, nit, tipo } = req.body
      UserService.search(page, num, prop, orden, name, nit, tipo) 
        .then((result) => {
          res.status(200).send({ result: result });                
        })        
        .catch((reason) => {          
          res.status(400).send({ reason });
        });   
  }

  static testing(req, res) {         //verificar
    var d = new Date();
    var formatted = new Date(d + "UTC").toISOString().replace(/-/g, "").split("T")[0];
    UserService.getItem(req.params.id)
      .then((user) => {               
        MailController.testing("testing",user,formatted)
        .then((user) => {       
          res.status(200).send({ message: "user", result: user });
        })  
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });    
  }

  static getItems(req, res) { 
    UserService.items()
    .then((rows)=>{
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{     
     
        res.status(400).send({message: reason})
    }) 
  }
  
}

export default UserController;
