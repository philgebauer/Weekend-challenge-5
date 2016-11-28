var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/employees', {
    templateUrl: '/views/templates/employees.html',
    controller: 'EmployeeController',
    controllerAs: 'employees'
  })
  .otherwise({
    redirectTo: 'employees'
  });
}]);


myApp.controller("EmployeeController", ["$http", function($http) {
  console.log('running');

  var self = this;
  self.newEmployee = {};
  self.employees = [];
  self.salary = 0;

  getEmployees();

  // read only
  function getEmployees() {
    $http.get('/employees')
      .then(function(response) {
        console.log(response.data);
        self.employees = response.data;
        salaryCalc();
      });
  }

  // tied to DOM thru self object
  self.addEmployee = function() {
    console.log('employees: ', self.newEmployee);
    $http.post('/employees', self.newEmployee)
      .then(function(response) {
        console.log('POST finished. Get employees again.');
        getEmployees();
      });
  }

  self.clickMe = function(empObj) {
    console.log(empObj);
    $http.delete('/employees/' + empObj.id)
      .then(function(response){
        console.log('delete finsished');
        getBooks();
      })
  }

  self.updateMe = function(empObj){
    $http.put('/employees/'+ empObj.id, empObj)
    .then(function(response){
      console.log('Edit finsished');
      getEmployees();
    })
  }


  function salaryCalc() {
    for (var i = 0; i < self.employees.length; i++) {
      self.salary += self.employees[i].annualsalary;
    }
    self.salary /= 12;
  }

}]);

// myApp.controller("SalaryController", ["$http", function($http) {
//   console.log('salary controller running');
//
// var self = this;
//
// self.salary = [];
// self.newSalary = {};
//
//
// getBudgets();
// console.log("salary is", self.budgets);
//
//
//
// function getBudgets() {
//   $http.get('/salary')
//   .then(function(response) {
//     self.salary = response.data;
//     console.log(response.data);
//
//   });
// };
//
//
// }]);
