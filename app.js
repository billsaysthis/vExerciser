var gotoNextStep = function(e) {
	e.preventDefault();
	var currSet = $(this).closest('#workoutSet'),
      next = '.step_' + (parseInt($(this).data('step')) + 1).toString();
	if ($(next).length > 0) {
		$(this).removeClass('active');
		$(currSet).find('ul.active').find(next).addClass('active');
	} else {
		$(this).html('You Finished!!');
	}
}

var changeSets = function(e) {
  $('#workoutSet ul').removeClass('active');
  $(e.target.href).find('.step1').addClass('active');
  $(e.target.href).addClass('active');
}

$(function() {
	var Exercise = Parse.Object.extend("Exercise"),
		query = new Parse.Query(Exercise);

	query.find({
		success: function(results) {
			var exerString = '<ul class="active" id="workoutSet1">', currSet = "1";
			$.each(results, function() {
				if (currSet !== this.get('workout')) {
					currSet = this.get('workout');
					exerString = exerString + '</ul><ul id="workoutSet' + currSet + '">';
				}
				exerString = exerString + '<li class="exerciseStep step_' + this.get('step') + '" data-step="' + this.get('step') + '"><span class="stepTitle"">Step ' + this.get('step') + '</span><span class="stepInstruction">' + this.get('instruction') + '</span><span class="stepReps">X<br><br>' + this.get('repetitions') + ' times</span></li>'
			});
			exerString = exerString + '</ul>';
			$('#workoutSet').append(exerString);
			$('#workoutSet').find('.exerciseStep').first().addClass('active');
			$('#workoutSet').on('click', '.exerciseStep', gotoNextStep);
		},
		error: function(error) {
			alert("Problem fetching exercises: " + error.code + " " + error.message);
		}
	});
  $('.setList').on('click', 'a', changeSets);
});