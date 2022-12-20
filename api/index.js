import http from 'http'
import express from 'express'
import routes from './server/routes'
import cors from 'cors'
import logger from 'morgan'
import cron from 'node-cron'
const fs = require("fs");
var shell = require('shelljs');

const hostname = '192.168.0.100'
const port = 4000
var app = express()
var server = http.createServer(app)

var moment = require('moment-timezone');
moment().tz("America/La_Paz").format();

app.use('/api/static',express.static(__dirname + '/public'));
app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))
routes(app);
app.get('*', (req, res) => 
  res.status(200).send({
	  message: "Welcome API SGFITT"
}))
cron.schedule("49 16 * * *", function() {  
	console.log("Runing Cron Job")


	if (shell.rm('-rf',__dirname + '/public/images/trash/*').code !== 0) {		
		shell.exit(1);		
	}	
	else{
	   shell.echo("Files Deletes");	   	   
	}
	
	if(shell.exec(__dirname+'/fitScript.sh').code !== 0){		
		shell.exit(1)
	}
	else{
		shell.echo("Positronic");	   	   
	 }
  });
server.listen(port, hostname, () =>{
	console.log(`Server is runing ar http://${hostname}:${port}/`)
})
