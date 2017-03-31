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

var port = 3000;
var l4ideasServer = http.createServer(app);

app.get('/', function(request, response){
     response.sendFile(__dirname + '/index4ideas.html');
});

function recursiveVerification(obj){
    for(var key in obj){
        if(typeof obj[key] === "string"){
            obj[key] = (obj[key]+'-labs4ideas');
        }
        else if(typeof obj[key] === "number"){
            obj[key] = (obj[key]+1);
        }
        else if(typeof obj[key] === "object"){
            if(Object.keys(obj).length > 1){  
                for(var i = 0; i < Object.keys(obj).length; i++){
                    var obj2 = obj[i];
                    if(typeof obj2 === "object"){
                        for(var k in obj2){
                            recursiveVerification(obj2[k]); 
                        }
                    }
                    recursiveVerification(obj2);
                }
                break;
            }
            else{
                recursiveVerification(obj[key]);
            }
        }
    }
    
    return JSON.stringify(obj);
}

app.post('/', function(request, response){
    var strJSON = request.body.json;
    var obj = JSON.parse(strJSON);
    
    console.log("before: "+ strJSON);
    
    strJSON = recursiveVerification(obj);
    
    console.log("after: "+ strJSON);
    
    response.send("<script type='text/javascript'> alert('"+ strJSON +"'); window.location.replace('http://localhost:"+ port +"'); </script>");
    response.end();
});

l4ideasServer.listen(port, function(){
    console.log('Server is running');
    console.log("Please access < localhost:"+ port +"/ >");
});