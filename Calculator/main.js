var operationArr = [];
var input = document.getElementById("screen");
var decimal = true;
input.value = 0;
var operBool = false;


$('.button').on('click', function(e) {

	e.stopPropagation();

	setFocus();

		var id = $(event.target).attr('id');
		var button = document.getElementById(id);
		console.log(typeof id + ": " + id);

	console.log(button.innerHTML);


	if(/[0-9]/.test(button.innerHTML) || (button.innerHTML === '.' && decimal)) {

		if(button.innerHTML === '.')
				decimal = false;


		if(input.value === "0" && button.innerHTML !== '.' && operBool)
				input.value = button.innerHTML;
		else
				input.value += button.innerHTML;

	} else if(/[asdm]/.test(id)) {

			if(operBool) {
					ans();
					operationArr[operationArr.length] = input.value;
					operationArr[operationArr.length] = id;
			} else {
				 operationArr[operationArr.length] = input.value;
				 operationArr[operationArr.length] = id;
				 clearCal("input", "decimal");
			}

			operBool = !operBool;


	} else if(button.innerHTML === "=") {
			ans();
	} else if (id === "CE") {
			clearCal();
	}

});





function clearCal(type1, type2, type3) {

	console.log(type1 + " " + type2);

	if (!type1) {
		input.value = "0";
		decimal = true;
		operationArr = [];
	}

	if ((type1 || type2 || type3) === "input") {
			input.value = "0";
	}

	if((type1 || type2 || type3) === "arr") {
			operationArr = [];
	}

	if((type1 || type2 || type3) === "decimal") {
			decimal = true;
	}

}


function setFocus() {
	input.focus();
}

function ans() {
		operationArr[operationArr.length] = input.value;

		var a = parseFloat(operationArr.shift());
		var operation = operationArr.shift();
		console.log(operation);
		var b = parseFloat(operationArr.shift());
		var retans = window[operation](a, b);
		input.value = retans
		operationArr.unshift(retans); //call 1 of 4 operations

	clearCal("decimal");
}

function operater(a,f,b) {
	return f(a,b);
}
function addition(a,b) {
	return (a + b);
}
function subract(a, b) {
	return a - b;
}
function multiple(a, b) {
	return a * b;
}
function divide (a, b) {
	return a/b;
}
