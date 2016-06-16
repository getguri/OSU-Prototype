var app = angular.module('myApp', []);

app.directive("btstAccordion", function () {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {},
        template:
            "<div class='accordion' ng-transclude></div>",
        link: function (scope, element, attrs) {

            // give this element a unique id
            var id = element.attr("id");
            if (!id) {
                id = "btst-acc" + scope.$id;
                element.attr("id", id);
            }

            // set data-parent on accordion-toggle elements
            var hdr1 = element.children().children().eq(0).children().eq(0);
            var hdr2 = element.children().children().eq(2).children().eq(0);
            var hdr3 = element.children().children().eq(4).children().eq(0);
            
                $(hdr1).attr("data-parent", "#" + id);
                $(hdr1).attr("href", "#" + id + "collapse" + 0);
            	
                $(hdr2).attr("data-parent", "#" + id);
                $(hdr2).attr("href", "#" + id + "collapse" + 1);
         
                $(hdr3).attr("data-parent", "#" + id);
                $(hdr3).attr("href", "#" + id + "collapse" + 2);
            
            var body1 = element.children().children().eq(1);
            var body2 = element.children().children().eq(3);
            var body3 = element.children().children().eq(5);

            $(body3).addClass("in"); // expand first pane
                $(body1).attr("id", id + "collapse" + 0);
            	$(body2).attr("id", id + "collapse" + 1);
                $(body3).attr("id", id + "collapse" + 2); 
        },
        controller: function () {}
    };
}).
directive('btstPane', function () {
    return {
        require: "^btstAccordion",
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
            title: "@",
            category: "=",
            order: "="
        },
        template:
            "<div class='accordion-group' >" +
            "  <div id='starrating' class='accordion-heading'>" +
            "    <i class='fa fa-plus-square-o f-s-20 accordion-toggle' data-toggle='collapse'>{{category.name}} -</i><span class='edit fr p-t-5 p-r-85'></span>" +
            "  </div>" +
            "<div class='accordion-body collapse'>" +
            "  <div class='accordion-inner' ng-transclude></div>" +
            "  </div>" +
            "</div>",
        link: function (scope, element, attrs) {
            scope.$watch("title", function () {
                // NOTE: this requires jQuery (jQLite won't do html)
                var hdr = element.children().eq(0).children().eq(0);
                hdr.html(scope.title);
            });
        }
    };
});

app.controller('myCtrl', function($scope) {
	$scope.name = '';
	$scope.career ='';
	$scope.address='';
	$scope.location = false;
	$scope.course = false;
    $scope.profession = '';
    $scope.counsel = '';
    $scope.school = '';
    $scope.section='';
    $scope.admissions = false;
    $scope.careers = false;
    //$scope.counter = 0;
});

$(document).ready(function(){
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
        var sectionVal= sectionSelect.val();
        if(typeof classVal === 'string' && classVal !== '' && typeof sectionVal === 'string' && sectionVal !== ''){
            finalStatus  += ratio;
        }

        finalStatus = Math.round(finalStatus);
        if(finalStatus > 0){
            $('#firstStepProgressReg').addClass('progress-started');
        } else {
            $('#firstStepProgressReg').removeClass('progress-started');
        }

        if(finalStatus == 100){
            $('#firstStepProgressReg').addClass('progress-end');
        } else {
            $('#firstStepProgressReg').removeClass('progress-end');
        }
        
        $('#firstStepProgressReg .progress').css('width', finalStatus + "%");
     });

    /*Career you are interested in search field*/
		$('#careersInterestedInAdded').on('click', '.close', function(){
 		$(this).parent().remove();
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
			}
		}
	};
	$("#careersInterestedInText").easyAutocomplete(careerConsider);

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

	/* Code for Star Rating */
	$(".star-rating-radio input[type='radio']").on('change', function(){
		$(this).parent().prevAll("label").addClass('active');
		$(this).parent().addClass('active');
		$(this).parent().nextAll("label").removeClass('active');
	});
		
	/* click on edit button fields enable */

	$('#starrating .edit').click(function(){
		$(this).parents('.contents').find('input,select,textarea,div').attr('disabled', false);
		$('#starrating').removeClass('disabled');
	});

	/* disabled button default */
	$('#starrating span').click(function(){
		if($('#starrating').hasClass('disabled')){
			return false	
		}
	});

	$(".thumb-rating-radio input[type='radio']").on('change', function(){
		$(this).parent().addClass('active');
		$(this).parent().next().addClass('active');
		$(this).parent().prevAll().removeClass('active');

	});	
});