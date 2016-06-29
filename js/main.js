var app = angular.module('myApp', ['ngAnimate']);

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
            var hdr1 = element.children().children().eq(0).children().eq(1);
            var hdr2 = element.children().children().eq(2).children().eq(1);
            /*var hdr3 = element.children().children().eq(4).children().eq(0);*/
            
                $(hdr1).attr("data-parent", "#" + id);
                $(hdr1).attr("href", "#" + id + "collapse" + 0);
            	
                $(hdr2).attr("data-parent", "#" + id);
                $(hdr2).attr("href", "#" + id + "collapse" + 1);
         
               /* $(hdr3).attr("data-parent", "#" + id);
                $(hdr3).attr("href", "#" + id + "collapse" + 2);*/
            
            var body1 = element.children().children().eq(1);
            var body2 = element.children().children().eq(3);
           /* var body3 = element.children().children().eq(5);*/

            //$(body3).addClass("in"); // expand first pane
                $(body1).attr("id", id + "collapse" + 0);
            	$(body2).attr("id", id + "collapse" + 1);
                /*$(body3).attr("id", id + "collapse" + 2); */
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
            "    <i class='fa fa-plus-square-o f-s-22'></i><span class='accordion-toggle' data-toggle='collapse'>{{category.name}}</span><span class='edit fr p-t-10 p-r-35'></span>" +
            "  </div>" +
            "<div class='accordion-body collapse'>" +
            "  <div class='accordion-inner' ng-transclude></div>" +
            "  </div>" +
            "</div>",
        link: function (scope, element, attrs) {
            scope.$watch("title", function () {
                // NOTE: this requires jQuery (jQLite won't do html)
                var hdr = element.children().eq(0).children().eq(1);
                hdr.html(scope.title);
            });
        }
    };
});

app.controller('myCtrl', function($scope) {
	$scope.name = '';
    $scope.fee = '';
    $scope.like = '';
    $scope.suggest = '';
    $scope.from = '';
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
    $scope.settutor = false;
    $scope.add = function(){
        $scope.settutor = true;
    };
});

"use strict"

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
				$('#careersInterestedInAdded').append('<li class="row"><span class="count">' + count + '</span><span class="text">' + value + '</span><span class="close"></span></li>');
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

    $(document).on('click', "#addAccordion", function() {
         //var inputVal = $("#input").val();
        var newDiv = '<div id="tutorrating" class="accordion-heading">    <i class="fa fa-plus-square-o f-s-20"><span class="accordion-toggle ng-binding" data-toggle="collapse" data-parent="#accordion" href="#accordioncollapse3">TUTOR: <span style="color:#01a4e7">Dr. Richard Dawkins </span> </span></i><span class="edit fr p-t-30 p-r-35"></span>  </div>';
        var content = '<div class="accordion-body collapse" id="accordioncollapse3"><div class="accordion-inner" ng-transclude=""><div class="f-s-20 p-b-10"><span><b>Tutor Name </b> Dr. Richard Dawkins</span><span class="p-l-30"><b>Type of course </b> Full Course</span></div><div class="f-s-20 p-b-10"><span><b>Subjects </b> <span>Physics,Chemistry,Maths</span></span><span style="padding-left:17px"><b>Number of students </b><span> 1-3</span></span></div><div class="f-s-20 p-b-10"><span><b>Fees Structure </b> <span>Weekly</span></span><span style="padding-left:120px"><b>Fees Amount </b> <span style="padding-left:30px">Rs 2000</span></span></div>';
        $("#accordion").append('<div class="contents accordion-group ng-scope ng-isolate-scope" title="TUTOR">' + newDiv +content+'</div>') ;

    });

	/* Code for Star Rating */
	$(".star-rating-radio input[type='radio']").on('change', function(){
		$(this).parent().prevAll("label").addClass('active');
		$(this).parent().addClass('active');
		$(this).parent().nextAll("label").removeClass('active');
        var conceptItems = $('#concept .active').length;
        var easyItems = $('#easy .active').length;
        var examItems = $('#exam .active').length;
        var generalItems = parseInt((conceptItems+easyItems+examItems)/3);
        if(generalItems == 1){
            $('#general #star16').parent().addClass('general');
        }
        else if(generalItems == 2){
            $('#general #star16').parent().addClass('general');
            $('#general #star17').parent().addClass('general');
        }
        else if(generalItems == 3){
            $('#general #star16').parent().addClass('general');
            $('#general #star17').parent().addClass('general');
            $('#general #star18').parent().addClass('general');
        }
        else if(generalItems == 4){
            $('#general #star16').parent().addClass('general');
            $('#general #star17').parent().addClass('general');
            $('#general #star18').parent().addClass('general');
            $('#general #star19').parent().addClass('general');
        }
         else if(generalItems == 5){
            $('#general #star16').parent().addClass('general');
            $('#general #star17').parent().addClass('general');
            $('#general #star18').parent().addClass('general');
            $('#general #star19').parent().addClass('general');
            $('#general #star20').parent().addClass('general');
        }
	});
		
        
	/* click on edit button fields enable */

	$('#starrating .edit').click(function(){
		$(this).parents('.contents').find('input,select,textarea,div,button').attr('disabled', false);
		$('#starrating').removeClass('disabled');
        
	});

    if ($("#weekly").is(":checked")) {
              $("#hours").attr('disabled', false);
              $("#week").attr('disabled', false);
              $("#month").attr('disabled', true);
              $("#course").attr('disabled', true);
         }

    $('#tutorrating .edit').click(function(){
        $(this).parents('.contents').find('input,select,textarea,div,button').attr('disabled', false);
        $('#tutorrating').removeClass('disabled');
    });
	/* disabled button default */
	$('#starrating span').click(function(){
		if($('#starrating').hasClass('disabled')){
			return false	
		}
	});	

    
    $("#hourly").click(function(){
     $("#hours").attr('disabled', false);
      $("#week").attr('disabled', true);
     $("#month").attr('disabled', true);
      $("#course").attr('disabled', true);
    });    

    $("#weekly").click(function(){
     $("#hours").attr('disabled', false);
     $("#week").attr('disabled', false);
     $("#month").attr('disabled', true);
      $("#course").attr('disabled', true);
    });

    $("#monthly").click(function(){
        $("#hours").attr('disabled', true);
        $("#week").attr('disabled', true);
        $("#month").attr('disabled', false);
        $("#course").attr('disabled', true);
    });

     $("#percourse").click(function(){
         $("#hours").attr('disabled', true);
        $("#week").attr('disabled', true);
        $("#month").attr('disabled', true);
        $("#course").attr('disabled', false);
    });

     if ($("#evening").is(":checked")) {
        $('.slider-time2').val("12:00 PM");
    }
    $("#morning").click(function(){   
         if($('.slider-time2').val().substr(6,1)=="P"){
                $('.slider-time2').val($('.slider-time2').val().replace("P","A"));
         }
         else if($('.slider-time2').val().substr(5,1)=="P"){
                $('.slider-time2').val($('.slider-time2').val().replace("P","A"));
         }  
         if($('.slider-time2').val().substr(0,5)=="12:00"){
            $('.slider-time2').val($('.slider-time2').val().replace("12:00","0:00"));
         }   
    });
    $("#evening").click(function(){   
         if($('.slider-time2').val().substr(5,1)=="A"){
                $('.slider-time2').val($('.slider-time2').val().replace("A","P"));
         }
         else if($('.slider-time2').val().substr(6,1)=="A"){
                $('.slider-time2').val($('.slider-time2').val().replace("A","P"));
         }   
         if($('.slider-time2').val().substr(0,4)=="0:00"){
            $('.slider-time2').val($('.slider-time2').val().replace("0:00","12:00"));
         }   
    });

    

    $("#slider-range").slider({
    range: true,
    min: 0,
    max: 660,
    step: 15,
    values: [0,660],
    slide: function (e, ui) {
        var hours1 = Math.floor(ui.values[0] / 60);
        var minutes1 = ui.values[0] - (hours1 * 60);

        if (hours1.length == 1) hours1 = '0' + hours2;
        if (minutes1.length == 1) minutes1 = '0' + minutes1;
        if (minutes1 == 0) minutes1 = '00';
        if (hours1 >= 12) {
            if (hours1 == 12) {
                hours1 = hours1;
                minutes1 = minutes1 ;
            } else if (hours1 == 24) {
                hours1 = 11;
                minutes1 = "59 PM";
            } else {
                hours1 = hours1 - 12;
                minutes1 = minutes1 ;
            }
        } else {
            hours1 = hours1;
            minutes1 = minutes1;
        }

        if ($("#morning").is(":checked")) {
            $('.slider-time2').val(hours1 + ':' + minutes1+' AM');
        }
        else{
            $('.slider-time2').val(hours1 + ':' + minutes1+' PM');
        }
    }
});
});