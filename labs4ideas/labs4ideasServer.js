var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var l4ideasServer = http.createServer(app);

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index4ideas.html');
});

app.post('/', function(request, response){
    var strJSON = request.body.json;
    var obj = JSON.parse(strJSON);
    
    console.log("before: "+ strJSON);
    
    for(var key in obj){
        var attrName = obj;
        var attrValue = obj[key];
        
        if(typeof obj[key] === "string"){
            obj[key] = (obj[key]+'-labs4ideas');
        }
        else{
            obj[key] = (obj[key]+1);
        }
    } 
    
    strJSON = JSON.stringify(obj);
    console.log("after: "+ strJSON);
    
    response.send("<script type='text/javascript'> alert('"+ strJSON +"') </script>");
    response.end();
});

l4ideasServer.listen(3000, function(){
    console.log('Server is running');
    console.log('Please access < localhost:3000/ >');
});