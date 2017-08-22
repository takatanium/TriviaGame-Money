
var trivia = {
	symbol: function(id, range) {
		var arr = this.getUniqueElem(4, range);
		correctIndex = tools.getRandom(4);
		display.makeBoxes(arr, "symbol", correctIndex);

		$('#trivia').html("Which element has the symbol " + arr[correctIndex].symbol + "?");
		$('#trivia').css('line-height', '76px');

		display.attachClicks(id);
	},
	number: function(id, range) {
		var arr = this.getUniqueElem(4, range);
		correctIndex = tools.getRandom(4);
		display.makeBoxes(arr, "number", correctIndex);

		$('#trivia').html("Which element has the<br>atomic number " + arr[correctIndex].number + "?");
		$('#trivia').css('line-height', '38px');

		display.attachClicks(id);
	},
	radius: function(id, range) {
		var arr = this.getUniqueKey(4, "radius", range);
		correctIndex = tools.getMaxAttrIndex(arr, "radius");
		display.makeBoxes(arr, "radius", correctIndex);

		$('#trivia').html("Which element has the<br>largest atomic radius?");
		$('#trivia').css('line-height', '38px');

		display.attachClicks(id);
	},
	eleneg: function(id, range) {
		var arr = this.getUniqueKey(4, "eleneg", range);
		correctIndex = tools.getMaxAttrIndex(arr, "eleneg");
		display.makeBoxes(arr, "eleneg", correctIndex);

		$('#trivia').html("Which element has the greatest electronegativity?");
		$('#trivia').css('line-height', '38px');

		display.attachClicks(id);
	},
	eleaff: function(id, range) {
		var arr = this.getUniqueKey(4, "eleaff", range);
		correctIndex = tools.getMaxAttrIndex(arr, "eleaff");
		display.makeBoxes(arr, "eleaff", correctIndex);

		$('#trivia').html("Which element has the greatest electron affinity?");
		$('#trivia').css('line-height', '38px');

		display.attachClicks(id);
	},
	member: function(id, range) {
		var arr = this.getUniqueKey(4, "member", range);
		correctIndex = tools.getRandom(4);
		display.makeBoxes(arr, "member", correctIndex);

		var plurality;
		arr[correctIndex].member === "noble gas" ? plurality = "es" : plurality = "s"; 
		$('#trivia').html("Which element is a member of the " + arr[correctIndex].member + plurality + '?');
		$('#trivia').css('line-height', '38px');

		display.attachClicks(id);
	},
	radioactive: function(id, range) {
		var arr = this.getUniqueBool(4, "radioactive", range);
		display.makeBoxes(arr, "radioactive", 0);

		$('#trivia').html("Which element is radioactive?").css('line-height', '76px');

		display.attachClicks(id);
	},
	getUniqueElem: function(num, range) {
		//get subset of elements
		var subSet = trivia.getElementSubSet(range);
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