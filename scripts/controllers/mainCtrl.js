angular.module('betApp').controller('mainCtrl', [
'$scope','$location','cuponFactory','auth','$timeout',

function($scope,$location,cuponFactory,auth,$timeout){
	angular.element(document).ready(function () {
        document.body.className += ' ' + 'main-background';
    });
	
	$scope.currentUser=auth.currentUser().name;
	$scope.saveMessage= ""
	
	

	cuponFactory.getKupon(function(cupon){
		console.log(cupon)
		$scope.kupony=cupon;
	});

	$scope.isListHide=true;
	$scope.isActive = function (viewLocation) {
 		var active = (viewLocation === $location.path());
 		return active;
	};

	$scope.runPanel = function(event){
		var kuponElement = document.getElementById("cupon-list")
		if($scope.isListHide==true){
			kuponElement.style.animationName="slideLeft ";
			kuponElement.style.top="0%";
		}else{
			kuponElement.style.animationName="slideRight ";
			kuponElement.style.top="-100%";
		}
		$scope.isListHide=!$scope.isListHide;
	}
	$scope.removeElement = function(item){
		cuponFactory.removeMecz(item);
	}
	$scope.logout = function(){
		auth.logOut();
	}
	$scope.saveC=function(){
		cuponFactory.saveCupon(function(message){
			$scope.saveMessage=message.data
			$timeout(function(){
				$scope.saveMessage=""
			},1500)
		});
	}
	$scope.deleteC=function(){
		cuponFactory.removeCupon(()=>{
			$scope.kupony = cuponFactory.getKupon();
		});
	}
}]);