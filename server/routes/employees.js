var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

// router.get('/:genre/*/*', function(req, res, next) {
//   console.log('req params', req.params);
//   req.message = "hello from the previous middleware!";
//   res.send('done');
//   // next();
// });

router.get('/', function(req, res) {
  console.log('message on REC: ', req.message);
  // get books from DB
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function(err, result) {
      done(); // close the connection.

      // console.log('the client!:', client);

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      res.send(result.rows);

    });

  });
});

router.post('/', function(req, res) {
  var newEmployee = req.body;
  console.log(newEmployee);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO employees (firstName, lastName, employeeID, jobTitle, annualSalary) ' +
      'VALUES ($1, $2, $3, $4, $5)',
      [newEmployee.firstName, newEmployee.lastName, newEmployee.employeeID, newEmployee.jobTitle, newEmployee.annualSalary],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });

});

router.delete('/:id', function(req, res) {
  empID = req.params.id;

  console.log('book id to delete: ', empID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'DELETE FROM employees WHERE id = $1',
      [empID],
      function(err, result) {
        done();

        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});

router.put('/:id', function(req, res) {
  empID = req.params.id;
  employee = req.body;

  console.log('book to update ', book);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'UPDATE employees SET firstName=$1, lastName=$2, employeeID=$3, jobTitle=$4, annualSalary=$5' +
      ' WHERE id=$7',
      // array of values to use in the query above
      [employee.firstName, employee.lastName, employee.employeeID, employee.jobTitle, employee.annualSalary, empID],
      function(err, result) {
        if(err) {
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
          console.log('get');
        }
      });
    }); // close connect

}); // end route


module.exports = router;
