angular.module('app').factory('clientesService', function ($http) {

  const url = 'http://localhost:54771/api/clientes';

  return {
    listar: listar,
    obter: obter
  }

  function listar(headerAuth) {
    return $http({
      url: url,
      method: 'GET',
      headers: {
        Authorization: headerAuth
      }
    });
  }

  function obter(id, headerAuth) {
    return $http({
      url: url,
      method: 'GET',
      params: id,
      headers: {
        Authorization: headerAuth
      }
    });
  }

});