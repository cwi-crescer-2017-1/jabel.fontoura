const module = angular.module('aula02', []);

module.controller('Exercicio2', ($scope, $locale) => {
    $scope.imprime = () => {
        const partesData = $scope.data.split("/");
        console.log(partesData[0]);
        $scope.resultadoData = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    }
});