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
});