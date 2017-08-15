$(document).ready(function(){

	display.categories();

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
		console.log(money);
		$('#money').attr('amount', money).text(money);
	},
	incWrong: function(id, num) {
		var wrong = parseInt($('#trivia').attr("wrong"));
		if (num !== "-1") {
			wrong++;
		}
		$('#trivia').attr("wrong", wrong);
	},
	incNum: function() {
		var num = parseInt($('#trivia').attr("num"));
		num++;
		$('#trivia').attr("num", num);
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
	answer: function(id, correct) {
		timer.stop();
		correct === "1" ? game.incCorrect(id) : game.incWrong(id, correct);

		for (var i = 1; i <= 4; i++) {
			$('#choice'+i).html(tools.capFirst($('#choice'+i).attr('name')) + ': ' + $('#choice'+i).attr('mark').split(" ")[0]);
			if ($('#choice'+i).attr('isAnswer') === "1") {
				$('#choice'+i).css('border', 'solid #46D301 4px');
				$('#choice'+i).addClass('blink');
			}
		}
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
		console.log(status);
		var text, color, img;
		if (status === "1") {
			text = "correct!";
			color = "#46D301";
			img = "assets/images/mark_check.png";
		}
		else if (status === "0") {
			text = "wrong!";
			color = "#D30000";
			img = "assets/images/mark_x.png";
		}
		else {
			text = "--";
			color = "#FAFAD2";
			img = "";
		}
		$('#'+id).html("<img class='sel-img' src="+img+">");
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
				amount: label[i]
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
																		trivia.symbol(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "med1" : $('#'+id).on('click', function(){
																		trivia.symbol(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "hard1" : $('#'+id).on('click', function(){
																		trivia.number(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "imp1" : $('#'+id).on('click', function(){
																		trivia.number(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "easy2" : $('#'+id).on('click', function(){
																		trivia.radius(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "med2" : $('#'+id).on('click', function(){
																		trivia.radius(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "hard2" : $('#'+id).on('click', function(){
																		trivia.radius(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "imp2" : $('#'+id).on('click', function(){
																		trivia.radius(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "easy3" : $('#'+id).on('click', function(){
																		trivia.member(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "med3" : $('#'+id).on('click', function(){
																		trivia.member(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "hard3" : $('#'+id).on('click', function(){
																		trivia.radioactive(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "imp3" : $('#'+id).on('click', function(){
																		trivia.member(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "easy4" : $('#'+id).on('click', function(){
																		trivia.eleneg(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "med4" : $('#'+id).on('click', function(){
																		trivia.eleneg(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "hard4" : $('#'+id).on('click', function(){
																		trivia.eleaff(id);
																		display.standardSelClick(id);
																		}).addClass('sel-hover'); break;
				case "imp4" : $('#'+id).on('click', function(){
																		trivia.eleaff(id);
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
		$('#'+id).attr('clicked', 'true');
		$('#'+id).css('border', 'solid #FAFAD2 4px');
		display.unbindSelClicks();	
	},
	unbindChoiceClicks: function() {
		$('.ans-box').off('click'); //turns clicks off
		$('.ans-box').removeClass('ans-hover'); //removes hover
	}
}

var trivia = {
	symbol: function(id) {
		//randomly get four elements
		var arr = this.getUniqueElem(4);

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
	number: function(id) {
		//randomly get four elements
		var arr = this.getUniqueElem(4);

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
	radius: function(id) {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "radius");

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
	eleneg: function(id) {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "eleneg");

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
	eleaff: function(id) {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "eleaff");

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
	member: function(id) {
		//randomly get four elements
		var arr = this.getUniqueKey(4, "member");

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
	radioactive: function(id) {
		//randomly get four elements
		var arr = this.getUniqueBool(4, "radioactive");
		
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