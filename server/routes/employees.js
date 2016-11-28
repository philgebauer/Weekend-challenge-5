var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

// - get employee data - //

router.get('/', function(req, res) {
  console.log('message on REC: ', req.message);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function(err, result) {
      done();

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      res.send(result.rows);

    });

  });
});

// - delete individual worker - not workin yet - //

router.delete('/:id', function(req, res) {
  var empID = req.params.id;
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

// - update database with new employee info - //

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
    });
});

module.exports = router;
