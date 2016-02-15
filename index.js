var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  //lets require/import the mongodb native drivers.
  var mongodb = require('mongodb');

  //We need to work with "MongoClient" interface in order to connect to a mongodb server.
  var MongoClient = mongodb.MongoClient;

  // Connection URL. This is where your mongodb server is running.
  //var url = 'mongodb://localhost:27017/my_database_name';  
  var url = 'mongodb://faizuser:fuser@ds035553.mongolab.com:35553/faiz_budget';

  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // Get the documents collection
      var collection = db.collection('users');

      //Create some users
      var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
      var user2 = {name: 'modulus user', age: 22, roles: ['user']};
      var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

      // Insert some users
      collection.insert([user1, user2, user3], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        }
        //Close connection
        db.close();
      });
    }
  });
  response.render('pages/index');
});

// app.get('/', function(request, response) {
//   var result = ''
//   var times = process.env.TIMES || 5
//   for (i=0; i < times; i++)
//     result += cool() + '<br/>';
//   response.send(result);
// });


app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


