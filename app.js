var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var deviceRouter = require('./routes/device');

var app = express();

var server = require("http").createServer(app);
var io = require('socket.io').listen(server);
// view engine setup
app.engine('.hbs', exphbs({
  defaultlayout: 'layout',
  extname: '.hbs',
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(session({ secret: "iot", resave: false, saveUninitialized: true }));
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
  socket.on('joinrom', function (data) {

    socket.join(data.seri, () => {
      console.log(data);
      // socket.to(socket.id).emit('my message', );
    });

  });

  console.log("user connected " + socket.id);
  var info = {
    data: "connected",
    Id: socket.id
  };
  socket.emit('welcome', info);
  socket.on('disconnect', function () {

    console.log("user disconnected " + socket.id);
  });


  socket.on('getstatic', function (data) {
    var static = {
      command: true

    };
    socket.emit('Server-send-static', static);

  });

  socket.on('update-static', function (data) {
    console.log(data);
    socket.to(data.seri).emit('mydata',data.command  );
    //io.to(data.Room, 'a new user has joined the room');
    //socket.broadcast.emit('Server-send-static',data);
    // var static = {
    //   command: false

    // };
    // socket.emit('Server-send-static', static);

  });

  socket.on('thongtin', function (data) {

    var res= data.espsend.split('-');
    
    socket.to(res[0]).emit('mymessage',res[1] );
    console.log(data);


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
server.listen(5000, function () {
  console.log('listening on *:5000');
});

module.exports = app;
