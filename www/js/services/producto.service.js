SERVICES.factory('ProductosServices', function($firebaseArray) {
  var bdbRef = new Firebase("https://bddproyecto.firebaseio.com/productos");
  return $firebaseArray(bdbRef);
})

SERVICES.factory('ProductosServicesPedido', function($firebaseArray) {
  var bdbRef = new Firebase("https://bddproyecto.firebaseio.com/pedido");
  return $firebaseArray(bdbRef);
});