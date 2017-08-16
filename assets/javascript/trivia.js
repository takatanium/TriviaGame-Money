$(document).ready(function(){

	display.categories();
	display.promptQuestion();
});

var game = {
	reset: function() {
		$('#trivia').attr('correct', "0");
		$('#trivia').attr('wrong', "0");
		$('#trivia').attr('num', "0");
	},
	incCorrect: function(id) {
		var correct = parseInt($('#trivia').attr("correct"));
		correct++;
		$('#trivia').attr('correct', correct);

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

			console.log($('#info').attr('intervalId'));
			console.log(currentPage + ": " + $('#info').attr('count'));

			if (currentPage === "question") {
				timer.display(sec-count);

				if (count >= sec) {
					timer.answer(3);

					display.answer(id, "-1");
					display.markCatSel(id,"-1");
					display.unbindChoiceClicks();
					//bind the clicks
					$('.sel-box').each(function() {
						display.bindSelClicks(this.id);
					});
				}
			}
			else {
				if (count >= sec) {
					console.log("Here");
					timer.stop();
					//check if grid is done
					$('#trivia').attr('num') === "16" ? display.stats() : display.promptQuestion();
				}
			}
		}, 1500));
	},
	stop: function() {
		console.log($('#info').attr('intervalId'));
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
	},
	answer: function(id, correct) {
		timer.answer(3);

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
	},
	attachClicks: function(id) {
		$('#choice1').on('click', function() {
			display.answer(id, $('#choice1').attr('isAnswer'));
			if ($('#choice1').attr('isAnswer') === "0") {
				$('#choice1').css('border', 'solid #D30000 4px');
				display.markCatSel(id,"0");
			} 
			else if ($('#choice1').attr('isAnswer') === "1") {
				display.markCatSel(id,"1");
			}
			else {
				display.markCatSel(id,"-1");
			}
			//bind the clicks
			$('.sel-box').each(function() {
				display.bindSelClicks(this.id);
			});
			//unbind choice clicks
			display.unbindChoiceClicks();
		});
		$('#choice2').on('click', function() {
			display.answer(id, $('#choice2').attr('isAnswer'));
			if ($('#choice2').attr('isAnswer') === "0") {
				$('#choice2').css('border', 'solid #D30000 4px');
				display.markCatSel(id,"0");
			}
			else if ($('#choice2').attr('isAnswer') === "1") {
				display.markCatSel(id,"1");
			}
			else {
				display.markCatSel(id,"-1");
			}
			//bind the clicks
			$('.sel-box').each(function() {
				display.bindSelClicks(this.id);
			});
			//unbind choice clicks
			display.unbindChoiceClicks();
		});
		$('#choice3').on('click', function() {
			display.answer(id, $('#choice3').attr('isAnswer'));
			if ($('#choice3').attr('isAnswer') === "0") {
				$('#choice3').css('border', 'solid #D30000 4px');
				display.markCatSel(id,"0");
			}
			else if ($('#choice3').attr('isAnswer') === "1") {
				display.markCatSel(id,"1");
			}
			else {
				display.markCatSel(id,"-1");
			}
			//bind the clicks
			$('.sel-box').each(function() {
				display.bindSelClicks(this.id);
			});
			//unbind choice clicks
			display.unbindChoiceClicks();
		});
		$('#choice4').on('click', function() {
			display.answer(id, $('#choice4').attr('isAnswer'));
			if ($('#choice4').attr('isAnswer') === "0") {
				$('#choice4').css('border', 'solid #D30000 4px');
				display.markCatSel(id,"0");
			}
			else if ($('#choice4').attr('isAnswer') === "1") {
				display.markCatSel(id,"1");
			}
			else {
				display.markCatSel(id,"-1");
			}
			//bind the cat sel clicks
			$('.sel-box').each(function() {
				display.bindSelClicks(this.id);
			});
			//unbind choice clicks
			display.unbindChoiceClicks();
		});
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
		$('#cat_container').append(this.genCatRow('cat'));
		$('#cat_container').append(this.genCatRow('easy'));
		$('#cat_container').append(this.genCatRow('med'));
		$('#cat_container').append(this.genCatRow('hard'));
		$('#cat_container').append(this.genCatRow('imp'));

		//bind the clicks
		$('.sel-box').each(function() {
			display.bindSelClicks(this.id);
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
	bindSelClicks: function(id) {
		if ($('#'+id).attr('clicked') === "false") {
			switch (id) {
				case "easy1" : $('#'+id).on('click', function(){
																		trivia.symbol(id, [0,18]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "med1" : $('#'+id).on('click', function(){
																		trivia.symbol(id, [18,109]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "hard1" : $('#'+id).on('click', function(){
																		trivia.number(id, [0,18]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "imp1" : $('#'+id).on('click', function(){
																		trivia.number(id, [18,109]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "easy2" : $('#'+id).on('click', function(){
																		trivia.radius(id, [0,10]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "med2" : $('#'+id).on('click', function(){
																		trivia.radius(id, [10,36]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "hard2" : $('#'+id).on('click', function(){
																		trivia.radius(id, [0,54]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "imp2" : $('#'+id).on('click', function(){
																		trivia.radius(id, [0,109]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "easy3" : $('#'+id).on('click', function(){
																		trivia.member(id, [0,18]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "med3" : $('#'+id).on('click', function(){
																		trivia.member(id, [0,54]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "hard3" : $('#'+id).on('click', function(){
																		trivia.radioactive(id, [0,109]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "imp3" : $('#'+id).on('click', function(){
																		trivia.member(id, [0,109]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "easy4" : $('#'+id).on('click', function(){
																		trivia.eleneg(id, [0,36]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "med4" : $('#'+id).on('click', function(){
																		trivia.eleneg(id, [0,109]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "hard4" : $('#'+id).on('click', function(){
																		trivia.eleaff(id, [0,36]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "imp4" : $('#'+id).on('click', function(){
																		trivia.eleaff(id, [0,109]);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
			}
		}
	},
	unbindSelClicks: function() {
		$('.sel-box').off('click'); //turns clicks off
		$('.sel-box').removeClass('sel-hover'); //turns off hover
	},
	standardSelClick: function(id) {
		timer.stop();
		$('#'+id).attr('clicked', 'true');
		$('#'+id).css('border', 'solid #FAFAD2 4px');
		display.unbindSelClicks();	
		timer.start(5, "question", id);
	},
	unbindChoiceClicks: function() {
		$('.ans-box').off('click'); //turns clicks off
		$('.ans-box').removeClass('ans-hover'); //removes hover
	}
}

var trivia = {
	symbol: function(id, range) {
		//randomly get four elements
		var arr = this.getUniqueElem(4, range);

		//randomly choose a correct answer
		correctIndex = tools.getRandom(4);

		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box ans-hover').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('mark', arr[i-1].symbol);
			choice.attr('name', arr[i-1].name);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the symbol " + arr[correctIndex].symbol + "?").css('line-height', '76px');

		display.attachClicks(id);
	},
	number: function(id, range) {
		//randomly get four elements
		var arr = this.getUniqueElem(4, range);

		//randomly choose a correct answer
		correctIndex = tools.getRandom(4);
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box ans-hover').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('mark', arr[i-1].number);
			choice.attr('name', arr[i-1].name);
			box.append(choice);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the atomic number " + arr[correctIndex].number + "?").css('line-height', '38px');

		display.attachClicks(id);
	},
	radius: function(id, range) {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "radius", range);

		//assign correct
		correctIndex = tools.getMaxAttrIndex(arr, "radius");
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box ans-hover').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('mark', arr[i-1].radius);
			choice.attr('name', arr[i-1].name);
			box.append(choice);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the largest atomic radius?").css('line-height', '38px');

		display.attachClicks(id);
	},
	eleneg: function(id, range) {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "eleneg", range);

		//assign correct
		correctIndex = tools.getMaxAttrIndex(arr, "eleneg");
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box ans-hover').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('name', arr[i-1].name);
			choice.attr('mark', arr[i-1].eleneg);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the greatest electronegativity?").css('line-height', '38px');

		display.attachClicks(id);
	},
	eleaff: function(id, range) {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "eleaff", range);

		//assign correct
		correctIndex = tools.getMaxAttrIndex(arr, "eleaff");
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box ans-hover').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('name', arr[i-1].name);
			choice.attr('mark', arr[i-1].eleaff);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element has the greatest electron affinity?").css('line-height', '38px');

		display.attachClicks(id);
	},
	member: function(id, range) {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "member", range);

		//randomly choose a correct answer
		correctIndex = tools.getRandom(4);
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box ans-hover').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('name', arr[i-1].name);
			choice.attr('mark', arr[i-1].member);
			(i-1) === correctIndex ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		var plurality;
		arr[correctIndex].member === "noble gas" ? plurality = "es" : plurality = "s"; 
		$('#trivia').html("Which element is a member of the " + arr[correctIndex].member + plurality + '?').css('line-height', '38px');

		display.attachClicks(id);
	},
	radioactive: function(id, range) {
		//randomly get four elements
		var arr = this.getUniqueBool(4, "radioactive", range);
		
		var selRow1 = $('<div>').addClass('row').attr('id', 'answer_top_row');
		var selRow2 = $('<div>').addClass('row').attr('id', 'answer_bot_row');

		for (var i = 1; i <= 4; i++) {
			var box = $('<div>').addClass('col-6 gen-col');
			var choice = $('<div>').addClass('ans-box ans-hover').attr('id', 'choice' + i);
			choice.text(tools.capFirst(arr[i-1].name));
			choice.attr('name', arr[i-1].name);
			choice.attr('mark', arr[i-1].radioactive);
			arr[i-1].radioactive ? choice.attr('isAnswer', '1') : choice.attr('isAnswer', '0');
			box.append(choice);
			i < 3 ? selRow1.append(box) : selRow2.append(box);
		}

		$('#answer_container').html(selRow1);
		$('#answer_container').append(selRow2);

		$('#trivia').html("Which element is radioactive?").css('line-height', '76px');

		display.attachClicks(id);
	},
	getUniqueElem: function(num, range) {
		//get subset of elements
		var subSet = trivia.getElementSubSet(range);
		console.log(subSet);
		var arr = [];

		for (var i = 0; i < num; i++) {
			var rand = tools.getRandom(subSet.length);
			if (arr.indexOf(subSet[rand]) === -1) {
				arr.push(subSet[rand]);
			}
			else {i--;}
		}
		return arr;
	},
	getUniqueKey: function(num, key, range) {
		var subSet = trivia.getElementSubSet(range);
		console.log(subSet);
		var arr = [];
		var arrKey = [];

		for (var i = 0; i < num; i++) {
			var rand = tools.getRandom(subSet.length);
			if (arr.indexOf(subSet[rand]) === -1 && subSet[rand][key] != null) {
				if (arrKey.indexOf(subSet[rand][key]) === -1) {
					arr.push(subSet[rand]);
					arrKey.push(subSet[rand][key]);
				}
				else {i--;}
			}
			else {i--;}
		}
		return arr;
	},
	getUniqueBool: function(num, key, range) {
		var subSet = trivia.getElementSubSet(range);
		console.log(subSet);
		var arr = [];

		//get a key of true
		var gotKey = false;
		while (!gotKey) {
			var rand = tools.getRandom(subSet.length);
			if (subSet[rand][key]) {
				arr.push(subSet[rand]);
				gotKey = true;
			}
		}

		for (var i = 1; i < num; i++) {
			var rand = tools.getRandom(subSet.length);
			if (arr.indexOf(subSet[rand]) === -1 && !subSet[rand][key]) {
					arr.push(subSet[rand]);
			}
			else {i--;}
		}

		return tools.shuffle(arr);
	},
	getElementSubSet: function(range) {
		var arr = [];
		//push subset of elements based on game mode
		for (var i = range[0]; i < range[1]; i++) {
			arr.push(elements[i]);
		}
		return arr;
	},
	questions: ["symbol", "number", "radius", "radioactive", "eleneg", "eleaff", "member"]
}