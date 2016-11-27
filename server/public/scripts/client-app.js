var myApp = angular.module("myApp", []);


myApp.controller("EmployeeController", ["$http", function($http) {
  console.log('running');

  var self = this;
  self.newEmployee = {};
  self.employees = [];

  getEmployees();

  // read only
  function getEmployees() {
    $http.get('/employees')
      .then(function(response) {
        console.log('HIIIII');
        console.log(response.data);
        self.employees = response.data;
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

}]);
