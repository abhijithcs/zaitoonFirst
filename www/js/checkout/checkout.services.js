angular.module('zaitoonFirst.checkout.services', [])

.service('trackOrderService', function () {
        var orderid = '';

        return {
            getOrderID: function () {
                return orderid;
            },
            setOrderID: function(value) {
                orderid = value;
            }
        };
})

.service('couponService', function () {
        var couponLock = false;
        var couponApplied = '';
        var discount = 0;

        return {
          getDiscount: function () {
            return discount;
          },
          setDiscount: function (value) {
            discount = value;
          },
          getStatus: function () {
              return couponLock;
          },
          setStatus: function(value) {
              couponLock = value;
          },
          getCoupon: function () {
                return couponApplied;
          },
          setCoupon: function(value) {
              couponApplied = value;
          }
        };
})

.service('CheckoutService', function ($http, $q){

  //Type of Order : Delivery OR Take away
  var checkoutMode = 'delivery';
  this.getCheckoutMode = function(){
    return checkoutMode;
  }
  this.setCheckoutMode = function(value){
    checkoutMode = value;
  }

  this.getUserCreditCards = function(){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      dfd.resolve(database.user.credit_cards);
    });
    return dfd.promise;
  };

  this.getUserShippingAddresses = function(){
    var dfd = $q.defer();

    var data = {};
    data.token = JSON.parse(window.localStorage.user).token;

    $http({
      method  : 'POST',
      url     : 'http://localhost/vega-web-app/online/fetchusers.php',
      data    : data, //forms user object
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
     })
    .then(function(response) {
      dfd.resolve(response.data.savedAddresses);
    });

    return dfd.promise;
  };

  this.saveUserSelectedCard = function(card){
    window.localStorage.zaitoonFirst_selected_card = JSON.stringify(card);
  }
  this.saveUserSelectedAddress = function(address){
    window.localStorage.zaitoonFirst_selected_address = JSON.stringify(address);
  }
  this.getUserSelectedCard = function(){
    return JSON.parse(window.localStorage.zaitoonFirst_selected_card || '[]');
  };
  this.getUserSelectedAddress = function(){
    return JSON.parse(window.localStorage.zaitoonFirst_selected_address || '[]');
  };
})

;
