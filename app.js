var gotoNextStep = function(e) {
	e.preventDefault();
	var next = '#step_' + (parseInt($(this).data('step')) + 1).toString();
	if ($(next).length > 0) {
		$(this).removeClass('active');
		$(next).addClass('active');
	} else {
		$(this).html('You Finished!!');
	}
}

$(function() {
	var Exercise = Parse.Object.extend("Exercise"),
		query = new Parse.Query(Exercise);

	query.find({
		success: function(results) {
			var exerString = '<ul class="active">', currSet = "1";
			$.each(results, function() {
				if (currSet !== this.get('workout')) {
					exerString = exerString + '</ul><ul>';
					currSet = this.get('workout');
				}
				exerString = exerString + '<li class="exerciseStep" id="step_' + this.get('step') + '" data-step="' + this.get('step') + '"><span class="stepTitle"">Step' + this.get('step') + '</span><span class="stepInstruction">' + this.get('instruction') + '</span><span class="stepReps"> X ' + this.get('repetitions') + ' times</span></li>'
			});
			exerString = exerString + '</ul>';
			$('#workoutSet ul').append(exerString);
			$('#workoutSet').find('.exerciseStep').first().addClass('active');
			$('#workoutSet').on('click', '.exerciseStep', gotoNextStep);
		},
		error: function(error) {
			alert("Problem fetching exercises: " + error.code + " " + error.message);
		}
	});
});