var clicks = {
		attachChoice: function(id) {
		for (var i = 1; i <= 4; i++) {
			$('#choice'+i).on('click', function() {
				display.answer(id, $(this).attr('isAnswer'));
				if ($(this).attr('isAnswer') === "0") {
					$(this).css('border', 'solid #D30000 4px');
					display.markCatSel(id,"0");
				} 
				else if ($(this).attr('isAnswer') === "1") {
					display.markCatSel(id,"1");
				}
				else {
					display.markCatSel(id,"-1");
				}
				//bind the clicks
				$('.sel-box').each(function() {
					clicks.bindSel(this.id);
				});
				//unbind choice clicks
				clicks.unbindChoice();
			});
		}
	},
	bindSel: function(id) {
		if ($('#'+id).attr('clicked') === "false") {
			switch (id) {
				case "easy1" : $('#'+id).on('click', function(){
																		trivia.symbol(id, [0,18]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "med1" : $('#'+id).on('click', function(){
																		trivia.symbol(id, [18,109]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "hard1" : $('#'+id).on('click', function(){
																		trivia.number(id, [0,18]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "imp1" : $('#'+id).on('click', function(){
																		trivia.number(id, [18,109]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "easy2" : $('#'+id).on('click', function(){
																		trivia.radius(id, [0,10]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "med2" : $('#'+id).on('click', function(){
																		trivia.radius(id, [10,36]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "hard2" : $('#'+id).on('click', function(){
																		trivia.radius(id, [0,54]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "imp2" : $('#'+id).on('click', function(){
																		trivia.radius(id, [0,109]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "easy3" : $('#'+id).on('click', function(){
																		trivia.member(id, [0,18]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "med3" : $('#'+id).on('click', function(){
																		trivia.member(id, [0,54]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "hard3" : $('#'+id).on('click', function(){
																		trivia.radioactive(id, [0,109]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "imp3" : $('#'+id).on('click', function(){
																		trivia.member(id, [0,109]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "easy4" : $('#'+id).on('click', function(){
																		trivia.eleneg(id, [0,36]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "med4" : $('#'+id).on('click', function(){
																		trivia.eleneg(id, [0,109]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "hard4" : $('#'+id).on('click', function(){
																		trivia.eleaff(id, [0,36]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
				case "imp4" : $('#'+id).on('click', function(){
																		trivia.eleaff(id, [0,109]);
																		clicks.standardSel(id);
																		}).addClass('sel-hover'); break;
			}
		}
	},
	standardSel: function(id) {
		timer.stop();
		$('#'+id).attr('clicked', 'true');
		$('#'+id).css('border', 'solid #FAFAD2 4px');
		clicks.unbindSel();
		timer.start(5, "question", id);
		display.resetColors();
	},
	unbindSel: function() {
		$('.sel-box').off('click'); //turns clicks off
		$('.sel-box').removeClass('sel-hover'); //turns off hover 
	},
	unbindChoice: function() {
		$('.ans-box').off('click'); //turns clicks off
		$('.ans-box').removeClass('ans-hover'); //removes hover
	}
}