var app = angular.module('myApp', ['ngAnimate']);

app.controller('myCtrl', function($scope) {
	$scope.name = '';
	$scope.profession = '';
	$scope.counsel = '';
	$scope.school = '';
	$scope.career ='';
	$scope.admissions = false;
	$scope.careers = false;
    /*$scope.items = ["Doctor","Electrical Engineer","Paramilitary"];
	
	$scope.remove = function(item){
  		 var index = $scope.items.indexOf(item);
  		 $scope.items.splice(index, 1);    
	};*/

});

/*app.directive('autoComplete', function($timeout) {
    return function($scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: $scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});*/

$(document).ready(function(){
	/*Register Form page-1 form validation */

	$('#firstStepRegistration input').on('blur change', function(){

		var yourFullNameText = $('#yourFullNameText');
		var yourProfessionText = $('#yourProfessionText');
		var yourStudentText = $('#yourStudentText');
		var classSelect = $('#classSelect');
		var sectionSelect = $('#sectionSelect');
		var yourSchoolText = $('#yourSchoolText');

		$("#stuname").val(yourStudentText);

		var count = 1;
		var finalStatus = 0;
		var ratio = 20;
		var nameVal = yourFullNameText.val();
		var professionVal = yourProfessionText.val();
		var studentVal = yourStudentText.val();
		var schoolVal = yourSchoolText.val();
		if(typeof nameVal === 'string' && nameVal !== '') {
			finalStatus += ratio;
		}
		if(typeof professionVal === 'string' && professionVal !== '') {
				finalStatus += ratio;
		}
		if(typeof studentVal === 'string' && studentVal !== '') {
				finalStatus += ratio;
		}
		if(typeof schoolVal === 'string' && schoolVal !== '') {
				finalStatus += ratio;
		}	

		
		var classVal= classSelect.val();
		if(typeof classVal === 'string' && classVal !== ''){
			finalStatus  += ratio;
		}

		var sectionVal= sectionSelect.val();
		if(typeof sectionVal === 'string' && sectionVal !== ''){
			finalStatus  += ratio;
		}
	

		finalStatus = Math.round(finalStatus);
	 	if(finalStatus > 0){
	 		$('#firstStepProgressReg').addClass('progress-started');
	 	} else {
	 		$('#firstStepProgressReg').removeClass('progress-started');
	 	}
	 	
	 	$('#firstStepProgressReg .progress').css('width', finalStatus + "%");
	 	/*$('#firstStepStarReg .update').css('width', finalStatus + '%');*/

	 });

	/*Career you are interested in search field*/
	$('#careersInterestedInAdded').on('click', '.close', function(){
 		$(this).parent().remove();
 		/*var list = $('#careersInterestedInAdded li');
 		if(list.length == 0){
 			$('#careersInterestedInAdded').parents('.field').find('.thumb-up img').hide();
 		}*/
 	});

 	var careerConsider = {
		data:[
			{"count": "1", "career": "Doctor"},
			{"count": "2", "career": "Electrical Engineer"},
			{"count": "3", "career": "Paramilitary"}
		],

		getValue: "career",

		list: {
			sort: {
				enabled: true
			},
			onChooseEvent: function() {
				var value = $("#careersInterestedInText").getSelectedItemData().career;
				var count = $('#careersInterestedInAdded > li').length +1;
				$('#careersInterestedInAdded').append('<li class="row"><span class="pull-first"></span><span class="pull-second"></span> <span class="count">' + count + '</span><span class="text">' + value + '</span><span class="close"></span></li>');
				/*$('#careersInterestedInAdded').parents('.field').find('.thumb-up img').show();*/
			}
		}
	};
	$("#careersInterestedInText").easyAutocomplete(careerConsider);

	/*soring*/

	function updateCount(){
		$('#careersInterestedInAdded > li').each(function(i, el){
			$(this).find('.count').html(i+1);
		});	
	}
	$('#careersInterestedInAdded').on('click', '.pull-first', function(){
		var prev = $(this).parent().prev();
		var item = $(this).parent().detach();
		prev.before(item);
		updateCount();
	});
	$('#careersInterestedInAdded').on('click', '.pull-second', function(){
		var next = $(this).parent().next();
		var item = $(this).parent().detach();
		next.after(item);
		updateCount();
	});
});



