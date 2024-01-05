//importing some helper methods
let {lastElements, fact, prod} = require("./math");


var x = [1, 2, 3, 4];
var fx = [6, 9, 14, 21];
console.log(`x = ${x}\nfx = ${fx}\n`);
var arr = [];
const h = x[1] - x[0];

let differenceTable = [], subArr = fx; //subArr is to help get each column of the table
differenceTable.push(subArr);
while(true) {
	if(subArr.length === 1)
		break;

	subArr = subArr.map((val, i, arr) => {return arr[i + 1] - arr[i]}).filter(val => !isNaN(val));
	differenceTable.push(subArr);
}
//differenceTable contains the difference table

//next, the backward values
let backValues = lastElements(differenceTable);
console.log(`the backward difference values are ${backValues}\n`);

function formular(a, x) { //a is the backValues
	//next, I ll be getting that first part
	//for all of them
	let firstHalf = [];
	a.forEach((val, i) => {
		let firstVal = val/(fact(i) * h**i);
		firstHalf.push(firstVal);
	});

	//next is the otherHalf consisting of
	//dem polynomials
	let otherHalf = [""];
	//initialised it with "" cus the first
	//one dont got nothing
	for(let i = 1; i < x.length; i++) {
		let string = "";
		let index = 0;
		do {
			string += `(x -${x[x.length - 1 - index]})`;
			//theres no space inbtw d operator
			//and the last term. that is to
			//allow me operate the last one
			//with its sign
			++index;
		} while(index <= i - 1);
		otherHalf.push(string);
	}
	//printing the current polynomial
	let theString = "= ";
	firstHalf.forEach((val, index) => {
		theString += `+${val}${otherHalf[index]} `;
	});
	console.log(theString, "\n");

	//otherHalf contains other half for
	//each term

	//Next, expanding the polynomials in the otherHalf
	//I'mma store the results in an array so that I can reference previous ones to calculate future ones
	let polyArr = ["", otherHalf[1]];
	for(let i = 2; i < otherHalf.length; i++) {
		//first getting the terms we'd be working with
		let firstBracket = polyArr[i - 1], otherBracket = otherHalf[i].substring(otherHalf[i].lastIndexOf('('));
		let firstTerms = firstBracket.split(/\(|\)/)[1].split(" ");
		let otherTerms = otherBracket.split(/\(|\)/)[1].split(" ");
		
		//next, gon be combining em terms with prod function
		let polynomial = "";
		firstTerms.forEach((firstTerm, index) => {
			otherTerms.forEach((otherTerm) => {
				polynomial += prod(firstTerm, otherTerm);
				polynomial += " ";
			});
		});
		polyArr.push("(" + polynomial.trim() + ")");
	}


	//polyArr was just an intermediate to expanding otherHalf, so...
	otherHalf = polyArr;

	//next, combining each terms in firstHalf and otherHalf into a single polynomial array
	let intPolyArr /*intermediate polynomial array*/= ["+" + firstHalf[0]]; //since we already know the value of the first one
	for(let i = 1; i < otherHalf.length; i++) { //i = 1 cus we starting from the second one
		let polynomial = ""; //a builder polynomial string
		let firstTerm = String(firstHalf[i]);
		let secondTerms = otherHalf[i].split(/\(|\)/)[1].split(" ");
		secondTerms.forEach(term => {
			polynomial += prod(firstTerm, term) + " ";
		});
		intPolyArr.push(polynomial);
	}

	//next, getting one long polynomial string outta intPolyArr...
	finalPolyString = (intPolyArr.join(" +").replace(/(\+)+0/g, "")); //the replace is to remove all the zero values
	console.log(`= ${finalPolyString}\n`);
	
	//this polynomial is posed to be of order x^2
	//first evaluating all the x^2's to get they combined value
	let x2 = [], x2regEx = /(\+|\-)\d*x\^2/g;
	let x2match; //this is gon be the exec object
	while(x2match = x2regEx.exec(finalPolyString)) {
		x2.push(finalPolyString.substring(x2match.index, x2match.index + x2match[0].length));
	}

	//next, evaluating all the x's to get they combined value
	let x1 = [], x1regEx = /(\+|\-)\d*x/g;
	let x1match;
	while(x1match = x1regEx.exec(finalPolyString)) {
		//tryna avoid matching the first part of x^2 terms e.g. matching 3x from 3x^2
		if(finalPolyString[x1match.index + x1match[0].length] === '^') //checking if the char after the match is '^'
			continue;

		x1.push(finalPolyString.substring(x1match.index, x1match.index + x1match[0].length));
	}


	//next, evaluating all the numbers to get they combined value
	let numbers = [], number = /(\+|\-)\d+\s/g;
	let numMatch;
	while(numMatch = number.exec(finalPolyString)) {
		numbers.push(finalPolyString.substring(numMatch.index, numMatch.index + numMatch[0].length));
	}
	

	//printing the current polynomial
	console.log("=", x2.join(" "), x1.join(" "), numbers.join(" "), "\n");


	//next, reducing em to they various final values

	//first, the x2's
	let intX2 /*intermediate x2 array*/ = x2.map((item) => {
		if(item.startsWith("-x") || item.startsWith("+x"))
			return 1;

		return item.split("x")[1];
	});
	//then getting the coefficient magnitude
	let x2coefficient = intX2.reduce((val, curr) => {
		return parseFloat(curr) + parseFloat(val);
	});

	//next, the x's
	let intX1 /*intermediate x2 array*/ = x1.map((item) => {
		if(item.startsWith("-x") || item.startsWith("+x"))
			return 1;
		return item.split("x")[0];
	});
	//then getting the coefficient magnitude
	let x1coefficient = intX1.reduce((val, curr) => {
		return parseFloat(curr) + parseFloat(val);
	});

	//next, the numbers
	let numberVal = numbers.reduce((val, curr) => {
		return parseFloat(curr) + parseFloat(val);
	});

	//Next putting it all back together
	let finalPolynomial = `${prod(String(x2coefficient), "x^2")} ${prod(String(x1coefficient), "x")} `;
	finalPolynomial += (numberVal < 0)? numberVal: "+" + numberVal; //the last coefficient... gon be printing it with its sign based on its sign
	
	console.log("= " + finalPolynomial);
}

formular(backValues, x);