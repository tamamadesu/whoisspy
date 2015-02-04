var app = require('http').createServer(handler).listen(1337);
var io = require('socket.io').listen(app,{origins: '*:*'});
var User = {};
var Ids  = [];
var text = [];
function handler(req,res){
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello Node\n You are really really awesome!');
}

io.sockets.on('connection',function(socket){

    User[socket.id] = {
        name:'',
        msg:[]
    };
    Ids.push(socket.id);
    // io.sockets.emit('send',text);
    

    socket.on("send",function(data){

        text.push(data.data);
        User[socket.id].msg.push(data.data);
        // socket.emit("send",);
        io.sockets.emit('send',User[socket.id]);

        console.log(User);
    });

    socket.on("join",function(data){
        User[socket.id].name = data.name;
        User[socket.id].time = new Date();
        data.ids = User;
        io.sockets.emit("join",data);
    });


    socket.on("disconnect",function(){
        delete User[socket.id];
    });

});


// io.sockets.on('disconnect',function(socket){
//     io.sockets.emit('disconnection',{data:true});
//     console.log(222);
//     User = {};
//     Ids = [];
// })