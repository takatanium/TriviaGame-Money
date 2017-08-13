$(document).ready(function(){

	$('#reset').on('click', function(){
		game.reset();
		display.question();
	});

});

var game = {
	reset: function() {
		$('#trivia').attr('correct', "0");
		$('#trivia').attr("wrong", "0");
		$('#trivia').attr("num", "0");
	},
	incCorrect: function() {
		var correct = parseInt($('#trivia').attr("correct"));
		correct++;
		$('#trivia').attr('correct', correct);
		$('#correct').html("Correct: " + correct);
	},
	incWrong: function(num) {
		var wrong = parseInt($('#trivia').attr("wrong"));
		if (num !== "-1") {
			wrong++;
		}
		$('#trivia').attr("wrong", wrong);
		$('#wrong').html("Wrong: " + wrong);
	},
	incNum: function() {
		var num = parseInt($('#trivia').attr("num"));
		num++;
		$('#trivia').attr("num", num);
		$('#num').html("Num: " + num);
	}
}

var timer = {
	start: function(sec, currentPage) {
		$('#timer').text(sec);
		$('#timer').attr('count', "0");

		$('#timer').attr('intervalId', setInterval(function() {
			var count = parseInt($('#timer').attr('count'));
			count++;
			$('#timer').attr('count', count);
			$('#timer').text(sec - count);

			if (count >= sec+1) {
				currentPage === "answer" ? display.question() : display.answer("-1");
			}
		}, 1000));
	},
	stop: function() {
		clearInterval($('#timer').attr('intervalId'));
	}
}

var display = {
	question: function() {
		timer.stop();
		parseInt($('#trivia').attr("num")) > 4 ? this.stats() : this.callQuestion();
	},
	callQuestion: function() {
		game.incNum();

		//display random question
		var question = trivia.questions[tools.getRandom(trivia.questions.length)];
    eval('trivia.'+question+'()');

		timer.start(5, "question");
	},
	answer: function(correct) {
		timer.stop();
		correct === "1" ? game.incCorrect() : game.incWrong(correct);

		for (var i = 1; i <= 4; i++) {
			// $('#sel'+i).append(" - " + $('#sel'+i).attr('mark'));
			$('#sel'+i).html('<h2>' + tools.capFirst($('#sel'+i).attr('name')) + '</h2>');
			$('#sel'+i).append('<p>' + $('#sel'+i).attr('mark') + '</p>');
			$('.selection').css('line-height', '30px');

			if ($('#sel'+i).attr('isAnswer') === "1") {
				$('#sel'+i).css('background-color', '#90EE90');
			}
		}

		timer.start(3, "answer");
	},
	stats: function() {
		$('#timer').text("--");
		var percentCorrect = (parseInt($('#trivia').attr('correct'))/parseInt($('#trivia').attr('num'))) * 100;
		var percentWrong = (parseInt($('#trivia').attr('wrong'))/parseInt($('#trivia').attr('num'))) * 100;
		var percentAnswered = (parseInt($('#trivia').attr('correct'))+parseInt($('#trivia').attr('wrong')))/parseInt($('#trivia').attr('num')) * 100;

		$('#trivia').html("<h1>Statistics</h1>");
		$('#trivia').append("<p>Correct: " + percentCorrect + "%</p>");
		$('#trivia').append("<p>Wrong: " + percentWrong + "%</p>");
		$('#trivia').append("<p>Unanswered: " + (100-percentAnswered) + "%</p>");
		$('#trivia').append("<button id='reset'>Restart</button>");
		$('#reset').on('click', function(){
			game.reset();
			display.question();
		});

	},
	attachClicks: function() {
		$('#sel1').on('click', function() {
			display.answer($('#sel1').attr('isAnswer'));
			if ($('#sel1').attr('isAnswer')==="0") {
				$('#sel1').css('background-color', '#DC143C');
			}
		});
		$('#sel2').on('click', function() {
			display.answer($('#sel2').attr('isAnswer'));
			if ($('#sel2').attr('isAnswer')==="0") {
				$('#sel2').css('background-color', '#DC143C');
			}
		});
		$('#sel3').on('click', function() {
			display.answer($('#sel3').attr('isAnswer'));
			if ($('#sel3').attr('isAnswer')==="0") {
				$('#sel3').css('background-color', '#DC143C');
			}
		});
		$('#sel4').on('click', function() {
			display.answer($('#sel4').attr('isAnswer'));
			if ($('#sel4').attr('isAnswer')==="0") {
				$('#sel4').css('background-color', '#DC143C');
			}
		});
	},
}

var trivia = {
	symbol: function() {
		//randomly get four elements
		var arr = this.getUniqueElem(4);

		//randomly choose a correct answer
		correctIndex = tools.getRandom(4);

		var selRow1 = $('<div>').addClass('sel-row');
		var selRow2 = $('<div>').addClass('sel-row');

		for (var i = 1; i <= 4; i++) {
			var sel = $('<div>').addClass('selection').attr('id', 'sel' + i);
			sel.text(tools.capFirst(arr[i-1].name));
			sel.attr('mark', arr[i-1].symbol);
			sel.attr('name', arr[i-1].name);
			(i-1) === correctIndex ? sel.attr('isAnswer', '1') : sel.attr('isAnswer', '0');
			i < 3 ? selRow1.append(sel) : selRow2.append(sel);
		}

		var selBox = $('<div>').addClass('sel-box').attr('id', 'sel_box');
		selBox.append(selRow1);
		selBox.append(selRow2);

		var question = $('<h1>').addClass('question').attr('id', 'question');
		question.html('What element has the symbol: ' + arr[correctIndex].symbol);

		$('.trivia').html(question);
		$('.trivia').append(selBox);

		display.attachClicks();
	},
	number: function() {
		//randomly get four elements
		var arr = this.getUniqueElem(4);

		//randomly choose a correct answer
		correctIndex = tools.getRandom(4);
		
		var selRow1 = $('<div>').addClass('sel-row');
		var selRow2 = $('<div>').addClass('sel-row');

		for (var i = 1; i <= 4; i++) {
			var sel = $('<div>').addClass('selection').attr('id', 'sel' + i);
			sel.text(tools.capFirst(arr[i-1].name));
			sel.attr('mark', arr[i-1].number);
			sel.attr('name', arr[i-1].name);
			(i-1) === correctIndex ? sel.attr('isAnswer', '1') : sel.attr('isAnswer', '0');
			i < 3 ? selRow1.append(sel) : selRow2.append(sel);
		}

		var selBox = $('<div>').addClass('sel-box').attr('id', 'sel_box');
		selBox.append(selRow1);
		selBox.append(selRow2);

		var question = $('<h1>').addClass('question').attr('id', 'question');
		question.html('What element has the atomic number: ' + arr[correctIndex].number);

		$('.trivia').html(question);
		$('.trivia').append(selBox);

		display.attachClicks();
	},
	radius: function() {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "radius");

		//assign correct
		correctIndex = tools.getMaxAttrIndex(arr, "radius");
		
		var selRow1 = $('<div>').addClass('sel-row');
		var selRow2 = $('<div>').addClass('sel-row');

		for (var i = 1; i <= 4; i++) {
			var sel = $('<div>').addClass('selection').attr('id', 'sel' + i);
			sel.text(tools.capFirst(arr[i-1].name));
			sel.attr('mark', arr[i-1].radius);
			sel.attr('name', arr[i-1].name);
			(i-1) === correctIndex ? sel.attr('isAnswer', '1') : sel.attr('isAnswer', '0');
			i < 3 ? selRow1.append(sel) : selRow2.append(sel);
		}

		var selBox = $('<div>').addClass('sel-box').attr('id', 'sel_box');
		selBox.append(selRow1);
		selBox.append(selRow2);

		var question = $('<h1>').addClass('question').attr('id', 'question');
		question.html('Which element is largest?');

		$('.trivia').html(question);
		$('.trivia').append(selBox);

		display.attachClicks();
	},
	eleneg: function() {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "eleneg");

		//assign correct
		correctIndex = tools.getMaxAttrIndex(arr, "eleneg");
		
		var selRow1 = $('<div>').addClass('sel-row');
		var selRow2 = $('<div>').addClass('sel-row');

		for (var i = 1; i <= 4; i++) {
			var sel = $('<div>').addClass('selection').attr('id', 'sel' + i);
			sel.text(tools.capFirst(arr[i-1].name));
			sel.attr('name', arr[i-1].name);
			sel.attr('mark', arr[i-1].eleneg);
			(i-1) === correctIndex ? sel.attr('isAnswer', '1') : sel.attr('isAnswer', '0');
			i < 3 ? selRow1.append(sel) : selRow2.append(sel);
		}

		var selBox = $('<div>').addClass('sel-box').attr('id', 'sel_box');
		selBox.append(selRow1);
		selBox.append(selRow2);

		var question = $('<h1>').addClass('question').attr('id', 'question');
		question.html('Which element has the greatest electronegativity?');

		$('.trivia').html(question);
		$('.trivia').append(selBox);

		display.attachClicks();
	},
	eleaff: function() {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "eleaff");

		//assign correct
		correctIndex = tools.getMaxAttrIndex(arr, "eleaff");
		
		var selRow1 = $('<div>').addClass('sel-row');
		var selRow2 = $('<div>').addClass('sel-row');

		for (var i = 1; i <= 4; i++) {
			var sel = $('<div>').addClass('selection').attr('id', 'sel' + i);
			sel.text(tools.capFirst(arr[i-1].name));
			sel.attr('name', arr[i-1].name);
			sel.attr('mark', arr[i-1].eleaff);
			(i-1) === correctIndex ? sel.attr('isAnswer', '1') : sel.attr('isAnswer', '0');
			i < 3 ? selRow1.append(sel) : selRow2.append(sel);
		}

		var selBox = $('<div>').addClass('sel-box').attr('id', 'sel_box');
		selBox.append(selRow1);
		selBox.append(selRow2);

		var question = $('<h1>').addClass('question').attr('id', 'question');
		question.html('Which element has the greatest electron affinity?');

		$('.trivia').html(question);
		$('.trivia').append(selBox);

		display.attachClicks();
	},
	member: function() {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "member");

		//randomly choose a correct answer
		correctIndex = tools.getRandom(4);
		
		var selRow1 = $('<div>').addClass('sel-row');
		var selRow2 = $('<div>').addClass('sel-row');

		for (var i = 1; i <= 4; i++) {
			var sel = $('<div>').addClass('selection').attr('id', 'sel' + i);
			sel.text(tools.capFirst(arr[i-1].name));
			sel.attr('name', arr[i-1].name);
			sel.attr('mark', arr[i-1].member);
			(i-1) === correctIndex ? sel.attr('isAnswer', '1') : sel.attr('isAnswer', '0');
			i < 3 ? selRow1.append(sel) : selRow2.append(sel);
		}

		var selBox = $('<div>').addClass('sel-box').attr('id', 'sel_box');
		selBox.append(selRow1);
		selBox.append(selRow2);

		var memberType = arr[correctIndex].member;
		var question = $('<h1>').addClass('question').attr('id', 'question');
		question.html('Which element is a '+ memberType +'?');

		$('.trivia').html(question);
		$('.trivia').append(selBox);

		display.attachClicks();
	},
	radioactive: function() {
		//randomly get four elements
		var arr = this.getUniqueBool(4, "radioactive");
		
		var selRow1 = $('<div>').addClass('sel-row');
		var selRow2 = $('<div>').addClass('sel-row');

		for (var i = 1; i <= 4; i++) {
			var sel = $('<div>').addClass('selection').attr('id', 'sel' + i);
			sel.text(tools.capFirst(arr[i-1].name));
			sel.attr('name', arr[i-1].name);
			sel.attr('mark', arr[i-1].radioactive);
			arr[i-1].radioactive ? sel.attr('isAnswer', '1') : sel.attr('isAnswer', '0');
			i < 3 ? selRow1.append(sel) : selRow2.append(sel);
		}

		var selBox = $('<div>').addClass('sel-box').attr('id', 'sel_box');
		selBox.append(selRow1);
		selBox.append(selRow2);

		var question = $('<h1>').addClass('question').attr('id', 'question');
		question.html('Which element is radioactive?');

		$('.trivia').html(question);
		$('.trivia').append(selBox);

		display.attachClicks();
	},
	getUniqueElem: function(num) {
		var arr = [];
		for (var i = 0; i < num; i++) {
			var rand = tools.getRandom(elements.length);
			if (arr.indexOf(elements[rand]) === -1) {
				arr.push(elements[rand]);
			}
			else {i--;}
		}
		return arr;
	},
	getUniqueKey: function(num, key) {
		var arr = [];
		var arrKey = [];
		for (var i = 0; i < num; i++) {
			var rand = tools.getRandom(elements.length);
			if (arr.indexOf(elements[rand]) === -1 && elements[rand][key] != null) {
				if (arrKey.indexOf(elements[rand][key]) === -1) {
					arr.push(elements[rand]);
					arrKey.push(elements[rand][key]);
				}
				else {i--;}
			}
			else {i--;}
		}
		console.log(arr.length);
		return arr;
	},
	getUniqueBool: function(num, key) {
		var arr = [];

		//get a key of true
		var gotKey = false;
		while (!gotKey) {
			var rand = tools.getRandom(elements.length);
			if (elements[rand][key]) {
				arr.push(elements[rand]);
				gotKey = true;
			}
		}

		for (var i = 1; i < num; i++) {
			var rand = tools.getRandom(elements.length);
			if (arr.indexOf(elements[rand]) === -1 && !elements[rand][key]) {
					arr.push(elements[rand]);
			}
			else {i--;}
		}

		return tools.shuffle(arr);
	},
	questions: ["symbol", "number", "radius", "radioactive", "eleneg", "eleaff", "member"]
}