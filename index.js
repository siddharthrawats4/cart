const express= require("express");
const app = express();
const path= require('path');
const bodyParser = require("body-parser");
const config= require('config');
const cors= require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname ,'.','build','index.html'));
  }); 
}
else{
  app.use(express.static(path.join(__dirname, '/public')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/public/index.html'));
  });
}


const port=process.env.PORT || 5000;
console.log(port);
const server=app.listen(port, ()=> console.log(`Listening on port ${port}...`));
var env = process.env.NODE_ENV || 'development';
console.log(env);

module.exports= server;