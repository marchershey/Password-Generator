const result = document.getElementById('result');
const length = document.getElementById('length');
const lowercase = document.getElementById('lowercase');
const uppercase = document.getElementById('uppercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const button = document.getElementById('generate_button');
const copy = document.getElementById('copy');
const copy_icon = document.getElementById('copy_icon');

const character_array = {
	lower: randomLowercase,
	upper: randomUppercase,
	number: randomNumber,
	symbol: randomSymbol
};

document.onload = execute();

button.addEventListener('click', () => {
	copy.innerHTML = '<i class="fas fa-clipboard"></i>';
	execute();
});

copy.addEventListener('click', () => {
	result.removeAttribute('disabled');
	result.select();
	document.execCommand('copy');
	result.setAttribute('disabled', true);
	button.focus();
	copy.innerHTML = '<i class="fas fa-clipboard-check"></i>';
});

function execute() {
	const valLength = +length.value;
	const useLower = lowercase.checked;
	const useUpper = uppercase.checked;
	const useNumber = numbers.checked;
	const useSymbols = symbols.checked;

	result.value = generate(valLength, useLower, useUpper, useNumber, useSymbols);
}

function generate(length, lower, upper, number, symbol) {
	let password = '';
	const types_count = lower + upper + number + symbol;
	const types_true = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

	if (types_count === 0) {
		return '...';
	}

	for (let i = 0; i < length; i += types_count) {
		types_true.forEach(type => {
			const random = Object.keys(type)[0];
			password += character_array[random]();
		});
	}

	return password.slice(0, length);
}

function randomLowercase() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomUppercase() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function randomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function randomSymbol() {
	const symbols_val = document.getElementById('symbols_input').value;
	return symbols_val[Math.floor(Math.random() * symbols_val.length)];
}

function resetSymbols() {
	symbols_input.value = '!@#$%^&*(){}[]=<>/,.';
}

function toggleSymbEdit() {
	const editSymb = document.getElementById('symbols_edit');
	if (editSymb.style.display === 'none') {
		editSymb.style.display = 'block';
	} else {
		editSymb.style.display = 'none';
	}
}
