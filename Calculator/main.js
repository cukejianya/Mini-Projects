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

	console.log(button.innerHTML);


	if(/[0-9]/.test(button.innerHTML) || (button.innerHTML === '.' && decimal)) {

		if(button.innerHTML === '.')
				decimal = false;


		if(input.value === "0" && button.innerHTML !== '.')
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
				 clearCal("decimal", "input");
			}

			operBool = !operBool;


	} else if(button.innerHTML === "=") {
			ans();
	} else if (id === "CE") {
			clearCal();
	}

});





function clearCal(type1, type2, type3) {

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

		var a = parseFloat(operationArr[0]);
		var b = parseFloat(operationArr[2]);

	switch(operationArr[1]) {
		case "d":
				input.value = divide(a, b);
				break;
		case "s":
				input.value = subract(a, b);
				break;
		case "m":
				input.value = multiple(a, b);
				break;
		case "a":
				input.value = addition(a, b);
				break;
		default:
				break;
	}

	clearCal("arr", "decimal");
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
