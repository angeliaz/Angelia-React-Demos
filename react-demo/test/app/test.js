

function generateRandom() {
	return Math.random();
}

function sum(a, b) {
	return a + b;
}



var arr = [1, 2, 3, 4, 5].map(i => i * 2);
console.log(arr);

var test1 = {
    generateRandom: generateRandom,
    sum: sum
}

module.exports = test1;