var myApp = angular.module('myApp', []);

// - route provider / not needed now / will use when seperate salary page and controller are added - //

// myApp.config(['$routeProvider', function($routeProvider) {
//   $routeProvider
//   .when('/employees', {
//     templateUrl: '/views/templates/employees.html',
//     controller: 'EmployeeController',
//     controllerAs: 'employees'
//   })
//   .otherwise({
//     redirectTo: 'employees'
//   });
// }]);


// - EmployeeController - //

myApp.controller("EmployeeController", ["$http", function($http) {
  console.log('running');

  var self = this;
  self.newEmployee = {};
  self.employees = [];
  self.salary = 0;

  getEmployees();

// - grab all employees from the database - //

  function getEmployees() {
    $http.get('/employees')
      .then(function(response) {
        console.log(response.data);
        self.employees = response.data;
        salaryCalc();
      });
  }

// - add new employee to database - //

  self.addEmployee = function() {
    console.log('employees: ', self.newEmployee);
    $http.post('/employees', self.newEmployee)
      .then(function(response) {
        console.log('POST finished. Get employees again.');
        getEmployees();
      });
  }

// - horrible name / delete button function / not working yet - //
  self.clickMe = function(empID) {
    console.log(empID);
    $http.delete('/employees/' + empID.id)
      .then(function(response){
        console.log('delete finsished');
        getBooks();
      })
  }

// - grab all salaries and divide by 12 for monthly salary - //

  function salaryCalc() {
    for (var i = 0; i < self.employees.length; i++) {
      self.salary += self.employees[i].annualsalary;
    }
    self.salary /= 12;
  }

}]);
