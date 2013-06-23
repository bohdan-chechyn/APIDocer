var ADApp = angular.module('ADApp', [], function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/html/login.html',
		controller: loginController
	})
	.when('/dashboard', {
		templateUrl: '/html/dashboard.html',
		controller: dashboardController,
		resolve: dashboardController.resolve
	})
	.when('/dashboard/entity/:id', {
		templateUrl: '/html/dashboard.html',
		controller: dashboardController,
		resolve: dashboardController.resolve
	})
	.when('/addMethod', {
		templateUrl: '/html/methods/add.html',
		controller: methodsController.add,
		resolve:  methodsController.add.resolve
	});
});

function loginController($scope, $routeParams, $http, $location) {
	if (AD.shared.token) {
		$location.path('/dashboard');
		return;
	}

	$scope.login = function() {
		var email = $scope.email,
			password = $scope.password;

		$http.post('/auth', {
				email: email,
				password: password
		}).success(function(response) {
			if (response.status === 'OK') {
				AD.shared.token = response.token;
			}
			$location.path('/dashboard');
		});
	}
}

function dashboardController($scope, $routeParams, methods, entities) {
	
	$scope.methods = methods;
	$scope.entities = entities;
	$scope.showRequest = function(id) {
		console.log(id)
	}
}

dashboardController.resolve = {
  methods: function($q, $http, $route) {
    var deferred = $q.defer();
    var query = '/apis/1';
    if ($route.current.params.id) {
    	query += '?entityId=' + $route.current.params.id;
    }
    $http.get(query).success(function(successData) {
            deferred.resolve(successData); 
    }).error(function(errorData) {
            deferred.reject(); // you could optionally pass error data here
    });
    return deferred.promise;
  },
  entities: function($q, $http) {
    var deferred = $q.defer();
    $http.get('/apis/1/entities').success(function(successData) {
            deferred.resolve(successData); 
    }).error(function(errorData) {
            deferred.reject(); // you could optionally pass error data here
    });
    return deferred.promise;
  }
}


var methodsController = {
	add: function($scope, $routeParams, $http, $location, entities) {
		$scope.entities = entities;
		$scope.postMethod = function() {
			var method = {
				name: $scope.name,
				type: $scope.type,
				entityId: $scope.entityId.id,
				description: $scope.description
			};
			$http.post('/apis/1/methods', JSON.stringify(method)).success(function(response) {
				$location.path('/dashboard');
			});
		}
	}
}
 methodsController.add.resolve = {
  entities: function($q, $http) {
    var deferred = $q.defer();
    $http.get('/apis/1/entities').success(function(successData) {
            deferred.resolve(successData); 
    }).error(function(errorData) {
            deferred.reject(); // you could optionally pass error data here
    });
    return deferred.promise;
  }
}