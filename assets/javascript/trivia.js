$(document).ready(function(){

	// $('.sel-box').on('click', function(){
	// 	//map each car selection
	// 	if ($('.sel-box').attr('id') === "easy1") {
	// 			console.log("Hit");
	// 			trivia.symbol();
	// 	}

	// });
	display.categories();

});

var game = {
	reset: function() {
		$('#trivia').attr('correct', "0");
		$('#trivia').attr('wrong', "0");
		$('#trivia').attr('num', "0");
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
		$('#info').text("Timer: " + sec);
		$('#info').attr('count', "0");

		$('#info').attr('intervalId', setInterval(function() {
			var count = parseInt($('#info').attr('count'));
			count++;
			$('#info').attr('count', count);
			$('#info').text("Timer: " + (sec - count));

			if (count >= sec+1) {
				currentPage === "answer" ? display.question() : display.answer("-1");
			}
		}, 1000));
	},
	stop: function() {
		clearInterval($('#info').attr('intervalId'));
	}
}

var display = {
	question: function() {
		timer.stop();
		// parseInt($('#trivia').attr("num")) > 4 ? this.stats() : this.callQuestion();
		this.callQuestion();
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

		// for (var i = 1; i <= 4; i++) {
		// 	$('#choice'+i).html('<h2>' + tools.capFirst($('#choice'+i).attr('name')) + '</h2>');
		// 	$('#choice'+i).append('<p>' + $('#choice'+i).attr('mark') + '</p>').css('font-size', '10px');
		// 	$('.ans-box').css('line-height', '16px');

		// 	if ($('#choice'+i).attr('isAnswer') === "1") {
		// 		$('#choice'+i).css('background-color', '#90EE90');
		// 	}
		// }

		// timer.start(3, "answer");
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
		// $('#trivia').append("<button id='reset'>Restart</button>");
		// $('#reset').on('click', function(){
		// 	game.reset();
		// 	// display.question();
		// });

	},
	attachClicks: function() {
		$('#choice1').on('click', function() {
			display.answer($('#choice1').attr('isAnswer'));
			if ($('#choice1').attr('isAnswer')==="0") {
				$('#choice1').css('border', 'solid #DC143C 2px');
			}
		});
		$('#choice2').on('click', function() {
			display.answer($('#choice2').attr('isAnswer'));
			if ($('#choice2').attr('isAnswer')==="0") {
				$('#choice2').css('border', 'solid #DC143C 2px');
			}
		});
		$('#choice3').on('click', function() {
			display.answer($('#choice3').attr('isAnswer'));
			if ($('#choice3').attr('isAnswer')==="0") {
				$('#choice3').css('border', 'solid #DC143C 2px');
			}
		});
		$('#choice4').on('click', function() {
			display.answer($('#choice4').attr('isAnswer'));
			if ($('#choice4').attr('isAnswer')==="0") {
				$('#choice4').css('border', 'solid #DC143C 2px');
			}
		});
	},
	categories: function() { //builds the entirety of categories
		//build out category titles
		$('#cat_container').append(this.genCatRow('cat'));
		$('#cat_container').append(this.genCatRow('easy'));
		$('#cat_container').append(this.genCatRow('med'));
		$('#cat_container').append(this.genCatRow('hard'));
		$('#cat_container').append(this.genCatRow('imp'));
	},
	genCatRow: function(whichRow) {
		var label = [];
		switch(whichRow) {
	    case "cat":
        label = ["Representation", "Atomic Size", "Element Type", "Electronic"];
        break;
	    case "easy":
	      label = ["$100", "$100", "$100", "$100"];
        break;
	    case "med":
	      label = ["$200", "$200", "$200", "$200"];
	    	break;
	    case "hard":
	      label = ["$300", "$300", "$300", "$300"];
	    	break;
	    case "imp":
	      label = ["$500", "$500", "$500", "$500"];
	    	break;
	    default:
	    	label = [];
		}

		var row = $('<div>').addClass('row').attr('id', whichRow+'_row');
		for (var i = 1; i <= 4; i++) {
			var outer, inner, cl;
			outer = $('<div>').addClass('col-3 gen-col');
			whichRow === "cat" ? cl = "cat-box" : cl = "sel-box";
			inner = $('<div>').addClass(cl).attr('id', whichRow+i).text(label[i-1]);
			//create onclicks
			if (cl === "sel-box") {
				switch (i) {
					case 1:
						inner.on('click', function() {
							whichRow === "easy" || whichRow === "med" ? trivia.symbol() : trivia.number();
						});
						break;
					case 2:
						inner.on('click', function() {
							trivia.radius();
						});
						break;
					case 3:
						inner.on('click', function() {
							whichRow === "easy" ? trivia.radioactive() : trivia.member();
						});
						break;
					case 4:
						inner.on('click', function() {
							whichRow === "easy" || whichRow === "med" ? trivia.eleneg() : trivia.eleaff();
						});
						break;
					default:
						console.log("Error generating selections");
				}				
			}
			outer.append(inner);
			row.append(outer);
		}

		return row;
	},
	getOnClick: function(whichRow, whichCol) {
		switch (whichCol) {
			case 1:
				trivia.symbol();
				break;
			case 2:
				trivia.radius();
				break;
			case 3:
				trivia.member();
				break;
			case 4:
				trivia.eleneg();
				break;
			default:
				console.log("Error generating selections");
		}
	}
}

var trivia = {
	symbol: function() {
		//randomly get four elements
		var arr = this.getUniqueElem(4);

		//randomly choose a correct answer
		correctIndex = tools.getRandom(4);

		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('mark', arr[i-1].symbol);
			choice.attr('name', arr[i-1].name);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the symbol " + arr[correctIndex].symbol) + "?";

		display.attachClicks();
	},
	number: function() {
		//randomly get four elements
		var arr = this.getUniqueElem(4);

		//randomly choose a correct answer
		correctIndex = tools.getRandom(4);
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('mark', arr[i-1].number);
			choice.attr('name', arr[i-1].name);
			box.append(choice);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the atomic number " + arr[correctIndex].number) + "?";

		display.attachClicks();
	},
	radius: function() {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "radius");

		//assign correct
		correctIndex = tools.getMaxAttrIndex(arr, "radius");
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('mark', arr[i-1].radius);
			choice.attr('name', arr[i-1].name);
			box.append(choice);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the largest atomic radius?");

		display.attachClicks();
	},
	eleneg: function() {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "eleneg");

		//assign correct
		correctIndex = tools.getMaxAttrIndex(arr, "eleneg");
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('name', arr[i-1].name);
			choice.attr('mark', arr[i-1].eleneg);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the greatest electronegativity?");

		display.attachClicks();
	},
	eleaff: function() {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "eleaff");

		//assign correct
		correctIndex = tools.getMaxAttrIndex(arr, "eleaff");
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('name', arr[i-1].name);
			choice.attr('mark', arr[i-1].eleaff);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the greatest electron affinity?");

		display.attachClicks();
	},
	member: function() {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "member");

		//randomly choose a correct answer
		correctIndex = tools.getRandom(4);
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('name', arr[i-1].name);
			choice.attr('mark', arr[i-1].member);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element is a member of the " + arr[correctIndex].member +'s?');

		display.attachClicks();
	},
	radioactive: function() {
		//randomly get four elements
		var arr = this.getUniqueBool(4, "radioactive");
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('name', arr[i-1].name);
			choice.attr('mark', arr[i-1].radioactive);
			arr[i-1].radioactive ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);
		
		$('#trivia').html("Which element is radioactive?");

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