var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var employees = require('./routes/employees');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  next();
});

//routes
app.use('/employees', employees);


// Catchall route
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.use(express.static('./server/public'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
