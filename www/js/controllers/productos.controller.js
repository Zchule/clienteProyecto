CTRLS.controller('ProductosCtrl', function($scope, ProductosServicesPedido, $ionicLoading, ProductosServices, $ionicActionSheet, $ionicModal) {
  
	$scope.showOptions = showOptions;
	$scope.deleteProducto = deleteProducto;
 	$scope.editProducto = editProducto;
  $scope.openModal = openModal;

  $scope.closeModal = closeModal;
  $scope.saveProducto = saveProducto;

  $scope.isNew = true;
  $scope.producto = {};
  $scope.modal = null;

  $ionicLoading.show({
    template: 'Cargando...'
  });

    $scope.productos = ProductosServices;

    $scope.productos.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

  

  $ionicModal.fromTemplateUrl('templates/producto-pedido-modal.html', {
    scope: $scope
  })

  .then(function(modal){
    $scope.modal = modal;
  });

  function openModal(){
    $scope.isNew = true;
    $scope.producto = {};
    $scope.modal.show();
  }

  function closeModal(){
    $scope.modal.hide();
  }

 $scope.pedidos = ProductosServicesPedido;
  $scope.agregarPedido = function() {
      if($scope.isNew){

        $scope.pedidos.face='img/ionic.png';

                /** Se guadar en firebase */
                $scope.pedidos.$add({

                  "nombre":$scope.pedidos.nombre,
                  "cantidad":$scope.pedidos.cantidad,
                  "precio":$scope.pedidos.precio
                  
                });
                $scope.modal.hide();
                return $scope.pedidos;
              }

          }

  function saveProducto(){
    if($scope.isNew){
      $scope.producto.face = 'ionic.png';
      $scope.productos.push( $scope.producto );
      $scope.producto = {};
    }
    $scope.modal.hide();
  }

	function deleteProducto(index){
    $scope.productos.splice( index, 1 );
  }

  function editProducto(index){
    $scope.isNew = false;
    $scope.producto = $scope.productos[index];
    $scope.modal.show();
  }

	function showOptions(indexProducto){    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-edit"></i> Hacer Pedido' }
      ],
      destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'CANCEL',
      titleText: "OPCIONES",
      destructiveButtonClicked: function(){
        $scope.deleteProducto( indexProducto );
        return true;
      },
      buttonClicked: function(indexButton){
        if(indexButton == 0){
          $scope.editProducto( indexProducto );
        }
        return true;
      }
    });
  }
  
  //$scope.productos = ProductosServices.all();
});