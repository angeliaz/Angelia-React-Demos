function generateRandom() {
	return Math.random();
}

function sum(a, b) {
	return a + b;
}

let aa = 'test';
console.log(aa)

var arr = [1, 2, 3, 4, 5].map(i => i * 2);
console.log(arr);

var testObj = {
    generateRandom: generateRandom,
    sum: sum
}

module.exports = testObj;
// export { generateRandom, sum }