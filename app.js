var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var logger = require('morgan');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var deviceRouter = require('./routes/device');

var app = express();

var server = require("http").createServer(app);
var io = require('socket.io').listen(server);
// view engine setup
app.engine('.hbs',exphbs({defaultlayout:'layout',
extname:'.hbs',
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(session({secret: "iot", resave: false,saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/device', deviceRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



io.on("connection", function (socket) {
  console.log("user connected " + socket.id);
  socket.on('disconnect',function(){
    
    console.log("user disconnected " + socket.id);
  });


  socket.on('getstatic',function(data){
    console.log('da nghe yeu cau getstatic'+ data);
    socket.emit('Server send static',"data nè");
    
  });

  socket.on('update-static',function(data){
    console.log('da nghe yeu cau update-static'+data);
    socket.emit('Server-send-static',data);
    
  });

  socket.on('thongtin',function(data){
    console.log('da nghe yeu cau thongtin');
    console.log(data);
    socket.emit('Server-send-static',data);
    
  });


});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  

});
// listen for requests
server.listen(5000, function(){
  console.log('listening on *:5000');
});

module.exports = app;
