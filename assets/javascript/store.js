var storeLog = [
	{cat: ["??","Grignard",false,
				 "https://en.wikipedia.org/wiki/Grignard_reaction"],
	 easy: ["$400","H", false],
	 med: ["$800","C", false],
	 hard: ["$1200","Br", false],
	 imp: ["$2000","Mg", false]},
	{cat: ["??","Gilman",false,"https://en.wikipedia.org/wiki/Gilman_reagent"],
	 easy: ["$400","H", false],
	 med: ["$800","C", false],
	 hard: ["$1200","Li", false],
	 imp: ["$2000","Cu", false]},
	{cat: ["??","Heck",false,"https://en.wikipedia.org/wiki/Heck_reaction"],
	 easy: ["$400","H", false],
	 med: ["$800","C", false],
	 hard: ["$1200","O", false],
	 imp: ["$2000", "Pd", false]},
	{cat: ["??","Friedel-Crafts",false,"https://en.wikipedia.org/wiki/Friedel%E2%80%93Crafts_reaction"],
	 easy: ["$400","Cl", false],
	 med: ["$800","Cl", false],
	 hard: ["$1200","Cl", false],
	 imp: ["$2000","Fe/Al", false]},
];

var gifs = ["https://media.giphy.com/media/3o6gE6VcDIuwebfUje/giphy.gif",
		        "https://media.giphy.com/media/yE72eDy7lj3JS/giphy.gif",
		        "https://media.giphy.com/media/qCj1NK1rxtnna/giphy.gif",
		        "https://media.giphy.com/media/122NnR1rRSq1nW/giphy.gif"]

var store = {
	categories: function() { //builds the entirety of categories
		//build out category titles
		$('#cat_container').html(this.genCatRow('cat'));
		$('#cat_container').append(this.genCatRow('easy'));
		$('#cat_container').append(this.genCatRow('med'));
		$('#cat_container').append(this.genCatRow('hard'));
		$('#cat_container').append(this.genCatRow('imp'));

		$('.sel-box').each(function() {
			store.bindSelClicks(this.id);
		});

	},
	genCatRow: function(whichRow) {
		var label = [];
		for (var i = 0; i < 4; i++) {
			if (storeLog[i][whichRow][2]) label.push(storeLog[i][whichRow][1]);
			else label.push(storeLog[i][whichRow][0]);
		}

		var row = $('<div>').addClass('row').attr('id', whichRow+'_row');
		for (var i = 1; i <= 4; i++) {
			var outer, inner, cl, hv, text;
			outer = $('<div>').addClass('col-3 gen-col');

			if (whichRow === "cat") {
				cl = "cat-box";
				hv = "";
				text = label[i-1];
				if (storeLog[i-1][whichRow][2]) {
					text = '<a href="'+ storeLog[i-1].cat[3] +'" target="_blank">'+ 
																	 storeLog[i-1].cat[1] +'</a>';
				}
			}
			else {
				cl = "sel-box";
				storeLog[i-1][whichRow][2] ? hv = "" : hv = "sel-hover";
				text = label[i-1];
			}

			inner = $('<div>').addClass(cl+" "+hv).html(text);
			inner.attr({
				id: whichRow+i,
				clicked: storeLog[i-1][whichRow][2],
				amount: label[i-1].slice(1),
				col: i
			});
			outer.append(inner);
			row.append(outer);
		}
		return row;
	},
	bindSelClicks: function(id) {
		if ($('#'+id).attr('clicked') === "false") {
			$('#'+id).on('click', function() {
				var money = parseInt($('#money').attr('amount'));
				var cost = parseInt($('#'+id).attr('amount'));
				//check if enough money
				if (cost <= money) {
					money -= cost; //subtract from money
					$('#money').attr('amount', money).text(money);

					var column = parseInt($('#'+id).attr('col'));
					storeLog[column-1][id.slice(0,-1)][2] = true;

					$('#'+id).text(storeLog[column-1][id.slice(0,-1)][1]);

					$('#'+id).off('click');
					$('#'+id).removeClass('sel-hover');

					//if all cat sels are true, display cat
					var showCat = 0;
					if (storeLog[column-1].easy[2]) showCat++;
					if (storeLog[column-1].med[2]) showCat++;
					if (storeLog[column-1].hard[2]) showCat++;
					if (storeLog[column-1].imp[2]) showCat++;

					if (showCat === 4) {
						$('#cat'+column).html('<a href="'+ storeLog[column-1].cat[3] +'" target="_blank">'+ 
																	 storeLog[column-1].cat[1] +'</a>');
						storeLog[column-1].cat[2] = true;
						store.celebrateComplete();
					}
				}
			});
		}
	},
	celebrateComplete: function() {
		var gif = $('<img>').addClass('gif');
		gif.attr('src', gifs[0]);
		gifs.splice(0, 1);

		var btn = $('<button>').attr('id', 'got-btn').text("GOT IT!!");

		$('.overlay').html(gif);
		$('.overlay').append(btn);
		$('.overlay').css('visibility', 'visible');

		$('#got-btn').on('click', function() {
			$('.overlay').css('visibility', 'hidden');
		});
	}
}