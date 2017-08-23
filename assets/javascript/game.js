$(document).ready(function(){

	display.categories();
	display.promptQuestion();
	$('#got-btn').on('click', function() {
			$('.overlay').css('visibility', 'hidden');
			$('.overlay').empty();
			$('#money_container').css('visibility', 'visible');
	});
});

var game = {
	reset: function() {
		$('#cat-container').empty();
		$('#trivia').attr('correct', "0");
		$('#trivia').attr('wrong', "0");
		$('#trivia').attr('num', "0");
	},
	incCorrect: function(id) {
		var correct = parseInt($('#trivia').attr("correct"));
		correct++;
		$('#trivia').attr('correct', correct).css('background-color', '#46D301');
		var span = $('<span>').addClass('info-correct').html("You got it CORRECT!!");
		$('#info').html(span).css('border', 'solid #46D301 2px');

		//increment money
		var money = parseInt($('#money').attr('amount')) + parseInt($('#'+id).attr('amount'));
		$('#money').attr('amount', money).text(money);

		//increment num
		game.incNum();
	},
	incWrong: function(id, num) {
		var wrong = parseInt($('#trivia').attr("wrong"));
		if (num !== "-1") {
			wrong++;
			var span = $('<span>').addClass('info-wrong').html("Sorry you're WRONG!!");
			$('#info').html(span).css('border', 'solid #D30000 2px');
			$('#trivia').css('background-color', '#D30000');
		}
		else {
			$('#info').html("Too slow -- ran out of TIME!!");
		}
		$('#trivia').attr("wrong", wrong);
		//increment num
		game.incNum();
	},
	incNum: function() {
		var num = parseInt($('#trivia').attr("num"));
		num++;
		$('#trivia').attr("num", num);
	}
}

var timer = {
	start: function(sec, currentPage, id) {
		$('#info').attr('count', "0");

		if (currentPage === "question") timer.display(5);

		$('#info').attr('intervalId', setInterval(function() {
			var count = parseInt($('#info').attr('count'));
			count++;
			$('#info').attr('count', count);

			if (currentPage === "question") {
				timer.display(sec-count);

				if (count >= sec) {
					timer.answer(2);

					display.answer(id, "-1");
					display.markCatSel(id,"-1");
					clicks.unbindChoice();
					//bind the clicks
					$('.sel-box').each(function() {
						clicks.bindSel(this.id);
					});
				}
			}
			else {
				if (count >= sec) {
					timer.stop();
					//check if grid is done
					$('#trivia').attr('num') === "16" ? display.stats() : display.promptQuestion();
				}
			}
		}, 1500));
	},
	stop: function() {
		clearInterval($('#info').attr('intervalId'));
	},
	display: function(time) {
		$('#info').empty();
		for (var i = 0; i < time+time-1; i++) {
			var box = $('<div>').addClass('red-box');
			$('#info').append(box);
		}
	},
	answer: function(time) {
		timer.stop();
		timer.start(time, "answer", "");		
	}
}

var display = {
	resetColors: function() {
		$('#trivia').css('background-color', 'lightgrey');
		$('#info').css('border', 'solid grey 2px');
	},
	promptQuestion: function() {
		timer.display(0); //clear timer
		//rebuild choices
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box').attr('id', 'choice' + i);
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Select a Category").css('line-height', '76px');

		display.resetColors();
	},
	promptReset: function(currentLoc) {
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		selRow1.addClass('reset-box sel-hover');
		var span1 = $('<span>').addClass('reset-span').text("Play Again");
		selRow1.html(span1);
		$('#answer_container').html(selRow1);

		//attach click
		selRow1.on('click', function() {
			game.reset();
			display.categories();
			display.promptQuestion();
		});

		if (currentLoc === "trivia") {
			var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');
			selRow2.addClass('reset-box sel-hover').attr('id', 'cash_in');
			var span2 = $('<span>').addClass('reset-span').text("Cash In");
			selRow2.html(span2);
			$('#answer_container').append(selRow2);

			//attach click
			selRow2.on('click', function() {
				game.reset();
				store.categories();
				display.promptReset("store");
				$('#trivia').html("Play again to earn more $$");
				$('#info').html("Click on card above to spend your $$");
			});
		}
	},
	answer: function(id, correct) {
		timer.answer(2);

		correct === "1" ? game.incCorrect(id) : game.incWrong(id, correct);

		for (var i = 1; i <= 4; i++) {
			$('#choice'+i).html(tools.capFirst($('#choice'+i).attr('name')) + ': ' + $('#choice'+i).attr('mark').split(" ")[0]);
			if ($('#choice'+i).attr('isAnswer') === "1") {
				$('#choice'+i).addClass('blink');
			}
		}
	},
	stats: function() {
		display.promptQuestion();

		$('#info').html("Your Results");

		var percentCorrect = Math.round((parseInt($('#trivia').attr('correct'))/parseInt($('#trivia').attr('num'))) * 100);
		var percentWrong = Math.round((parseInt($('#trivia').attr('wrong'))/parseInt($('#trivia').attr('num'))) * 100);
		var percentAnswered = Math.round((parseInt($('#trivia').attr('correct'))+parseInt($('#trivia').attr('wrong')))/parseInt($('#trivia').attr('num')) * 100);

		$('#trivia').html("<p>Correct: " + percentCorrect + "%</p>");
		$('#trivia').append("<p>Wrong: " + percentWrong + "%</p>");
		$('#trivia').append("<p>Unanswered: " + (100-percentAnswered) + "%</p>");

		display.promptReset("trivia");
	},
	markCatSel: function(id, status) {
		var text, color, img;
		if (status === "1") {
			text = "correct!";
			color = "#46D301";
			img = "assets/images/mark_check.png";
			$('#'+id).html("<img class='sel-img' src="+img+">");
		}
		else if (status === "0") {
			text = "wrong!";
			color = "#D30000";
			img = "assets/images/mark_x.png";
			$('#'+id).html("<img class='sel-img' src="+img+">");
		}
		else {
			text = "--";
			color = "#FAFAD2";
			$('#'+id).html(text).css('color', color);
		}
		$('#'+id).css('border', 'solid ' + color + ' 4px');
		$('#'+id).removeClass('sel-hover').off('click');
	},
	categories: function() { //builds the entirety of categories
		//build out category titles
		$('#cat_container').html(this.genCatRow('cat'));
		$('#cat_container').append(this.genCatRow('easy'));
		$('#cat_container').append(this.genCatRow('med'));
		$('#cat_container').append(this.genCatRow('hard'));
		$('#cat_container').append(this.genCatRow('imp'));

		//bind the clicks
		$('.sel-box').each(function() {
			clicks.bindSel(this.id);
		});
	},
	genCatRow: function(whichRow) {
		var label = [];
		switch(whichRow) {
	    case "cat":
	    	label = ["Representation", "Atomic Size", "Element Type", "Electronic"];
        break;
	    case "easy":
	    	label = ["100", "100", "100", "100"];
        break;
	    case "med":
	      label = ["200", "200", "200", "200"];
	    	break;
	    case "hard":
	      label = ["300", "300", "300", "300"];
	    	break;
	    case "imp":
	      label = ["500", "500", "500", "500"];
	    	break;
	    default:
	    	label = [];
		}

		var row = $('<div>').addClass('row').attr('id', whichRow+'_row');
		for (var i = 1; i <= 4; i++) {
			var outer, inner, cl, hv, text;
			outer = $('<div>').addClass('col-3 gen-col');
			whichRow === "cat" ? cl = "cat-box" : cl = "sel-box";
			whichRow === "cat" ? hv = "" : hv = "sel-hover";
			whichRow === "cat" ? text = label[i-1] : text = '$'+label[i-1];
			inner = $('<div>').addClass(cl+" "+hv).text(text);
			inner.attr({
				id: whichRow+i,
				clicked: 'false',
				amount: label[i-1]
			});
			outer.append(inner);
			row.append(outer);
		}
		return row;
	},
	genBoxes: function(arr, key, correctIndex) {
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');;
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');;

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box ans-hover').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('name', arr[i-1].name);
			choice.attr('mark', arr[i-1][key]);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			if (key === "radioactive") {
				arr[i-1][key] ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			}
			else {
				(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			}
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		var selBox = $('<div>').addClass('sel-box').attr('id', 'sel_box');
		selBox.append(selRow1);
		selBox.append(selRow2);

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);
	}
}
