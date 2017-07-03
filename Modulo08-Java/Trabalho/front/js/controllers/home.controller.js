angular.module('app').controller('HomeController', function ($scope, $location, authService, usuarioService, amigosService, postService, comentarioService, curtidaService, toastr, $localStorage) {

  init();

  $scope.postar = (post) => {
    post.idUsuario = { id: $scope.usuario.id };
    postService.create(post)
      .then(response => loadPosts($scope.usuario.id))
      .catch(error => console.log(error));

    post = {};
  }

  $scope.comentar = (comentario, idPost) => {
    comentario.idUsuario = { id: $scope.usuario.id };
    comentario.idPost = { id: idPost };

    comentarioService.create(comentario)
      .then(response => loadPosts($scope.usuario.id))
      .catch(error => console.log(error));

    post = {};
  }

  $scope.showComentarPost = (id) => {
    $scope.showComentar = true;
    $scope.postComentar = id;
  }

  $scope.curtir = (idPost) => {
    curtidaService.create({
      idPost: { id: idPost },
      idUsuario: { id: $scope.usuario.id }
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  $scope.descurtir = (curtidas) => {
    let idCurtida;
    curtidas.forEach(item => {
      if(item.idUsuario.id === $scope.usuario.id) idCurtida = item.id;
    });

    curtidaService.delete(idCurtida)
      .then(response => loadPosts())
      .catch(error => console.log(error));
  }

  $scope.aceitar = (solicitacao) => {
    console.log(solicitacao);
    solicitacao.aceito = 'A';
    amigosService.create(solicitacao)
      .then()
      .catch(error => console.log(error));

  }

  $scope.rejeitar = (solicitacao) => {
    solicitacao.aceito = 'R';
    amigosService.create()
      .then()
      .catch(error => console.log(error));
  }

  function init() {
    $scope.showComentar = false;
    $scope.postComentar = null;

    usuarioService.getLogged()
      .then(response => {
        $scope.usuario = response.data.dados;

        loadQtoSolicitacoes($scope.usuario.id, 'P');
        loadPosts($scope.usuario.id);
        loadSolicitacoes($scope.usuario.id, 'P');
      })
      .catch(error => {
        console.log(error);
        $location.path('/login');
      });
  }

  function loadQtoSolicitacoes(id, aceito) {
    amigosService.countAceitos(id, aceito)
      .then(response => $scope.usuario.qtoSolicitacoes = response.data)
      .catch(error => console.log(error));
  }

  function loadSolicitacoes(id, aceito) {
    amigosService.findAllByIdUsuario(id, aceito)
      .then(response => $scope.usuario.solicitacoes = response.data)
      .catch(error => console.log(error));
  }

  function loadPosts(id) {
    postService.findAllByIdUsuario(id)
      .then(response => {
        $scope.posts = response.data;

        $scope.posts.forEach(item => {
          loadCountCommentsPost(item);
          loadCountLikesPost(item);
          loadPostComments(item);
          loadLikedPosts(item);
        });
      })
      .catch(error => console.log(error));
  }

  function loadCountCommentsPost(item) {
    comentarioService.countByIdPost(item.id)
      .then(response => item.qtoComentarios = response.data)
      .catch(error => console.log(error));
  }

  function loadPostComments(item) {
    comentarioService.findAll(item.id)
      .then(response => item.comentarios = response.data)
      .catch(error => console.log(error));
  }

  function loadCountLikesPost(item) {
    curtidaService.countByIdPost(item.id)
      .then(response => item.qtoCurtidas = response.data)
      .catch(error => console.log(error));
  }
  function loadLikedPosts(item) {
    curtidaService.findByIdPost(item.id)
      .then(response => {
        item.curtidas = response.data;
        item.curtidas.forEach(e => {
          if(e.idUsuario.id === $scope.usuario.id) item.isLiked = true;
        });
      })
      .catch(error => console.log(error));
  }
});