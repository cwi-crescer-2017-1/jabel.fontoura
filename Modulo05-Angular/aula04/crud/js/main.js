const app = angular.module('crud', ['ngRoute', 'ngAnimate', 'toastr']);

app.config(($routeProvider) => {
    $routeProvider
			.when('/aulas', {
					templateUrl: 'partials/aulas.html'
			})
      .when('/instrutores', {
					templateUrl: 'partials/instrutores.html'
			})
			.otherwise({redirectTo: '/'});
});

app.controller('MainController', ($scope, toastr) => {

  $scope.getCheckedAula = (id) => {
    if(!angular.isUndefined($scope.editInstrutor) && Object.keys($scope.editInstrutor).length > 0) {
      for(aula of $scope.editInstrutor.aulas) 
        if(aula.id === id) return true;
    }
      return false;
  }

  function getIdIndex(id, array) {
    for(let i = 0; i < array.length; i++) 
        if(array[i].id === id) return i;
      
      return -1;
  }
});