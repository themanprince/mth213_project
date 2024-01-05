//my prod function
//this function allows me to take two
//algebraic terms and produce one
let prod = (termOne, termTwo) => {
		//returned value is based on the
		//types of the expression
		if(termOne == 'x' && termTwo == 'x')
		 return 'x^2';
		else if(termOne == 'x' && termTwo.match(/\-\d+/)) {
			let string = `-`;
			string += termTwo.split('-')[1];
			string += 'x';
			return string;
		}
		else if(termOne === "0")
			return "+0";
		else if(termOne.match(/\d+/) && termTwo.match(/x\^2/)) {
			if(termOne == "1")
				return termTwo;

			return `${termOne}x^2`;
		}
		else if(termOne.match(/\d+/) && termTwo.match(/\-\d+x/)) {
			if(termOne === "1")
				return termTwo;

			let string = "-";
			let val = parseFloat(termOne) * parseFloat(termTwo.split(/x|\-/)[1]);
			string += val + "x";
			return string;
		}else if(termOne.match(/\d+/) && termTwo === "x") {
			if(termOne === "1")
				return termTwo;

			let string = "";
			string += termOne + "x";
			return string;
		}
		else if(termOne.match(/\d+/) && termTwo.match(/\+\d+/)) {
			if(termOne === "1")
				return termTwo;
			
			let val = parseFloat(termOne) * parseFloat(termTwo.split(/\+/)[1]);
			return "+" + String(val);
		}
		else if(termOne.match(/\-\dx\^2/) && termTwo === 'x') {
		   let string = `-${termOne.split(/\-|x\^2/)[1]}x^3`;
		   return string;
		}else if(termOne.match(/\-\d+x\^2/) && termTwo.match(/\-\d+/)) {
		 	  let string = "+";
		 	  let val = parseFloat(termOne.split(/\-|x\^2/)[1]) * parseFloat(termTwo.split(/\-/)[1]);
		 	  string += val + "x^2";
		 	  return string;
		} else if(termOne.match(/\-\d+x/) && termTwo === 'x') {
			   let string = `-${termOne.split(/\-|x/)[1]}x^2`;
			   return string;
		} else if(termOne.match(/\-\d+x/) && termTwo.match(/\-\d+/)) {
		   let string = "+";
		   let val = parseFloat(termOne.split(/\-|x/)[1]) * parseFloat(termTwo.split('-')[1]);
		   	string += val + "x";
		   	//|
		   	return string;
		} 	else if(termOne.match(/\-\d+/) && termTwo == 'x') {
				let string = '-';
				string += termOne.split('-')[1];
				string += 'x';
				return string;
		} else if(termOne.match(/\-\d+/) && termTwo.match(/\-\d+/)) {
			  let string = '+';
		  	 let val = parseFloat(termOne.split('-')[1]) * parseFloat(termTwo.split('-')[1]);
			  string += String(val);
			  return string;
		}else if(termOne == "x^2" && termTwo == "x")
			  return "x^3";
		 else if(termOne === "x^3" && termTwo === "x")
			  return "x^4";
		 else if(termOne === "x^2" && termTwo.match(/\-\d+/)) {
			 	 let string = `-${termTwo.split('-')[1]}x^2`;
			 	 return string;
		 } else if(termOne === "x^3" && termTwo.match(/\-\d+/)) {
			 	 let string = `-${termTwo.split('-')[1]}x^3`;
			 	 return string;
		 } else if(termOne.match(/\+\d+x/) && termTwo === "x") {
			 	 let string = "+";
			 	 string += termOne.split(/\+|x/)[1];
			 	 //|
			 	 string += "x^2";
			 	 return string;
		 }	 else if(termOne.match(/\+\d+/) && termTwo === "x")
			  return termOne + "x";
		 else if(termOne.match(/\+\d+x/) && termTwo.match(/\-\d+/)) {
			   let string = "-";
			   let val = parseFloat(termOne.split(/\+|x/)[1]) * parseFloat(termTwo.split(/\-/)[1]);
			   string += val + "x"; //|
			   return string;
		 } else if(termOne.match(/\+\d+/) && termTwo.match(/\-\d+/)) {
			 	let string = "-";
			 	let val = parseFloat(termOne.split("+")[1]) * parseFloat(termTwo.split("-")[1]);
			 	string += val;
			 	return string;
		}else if(termOne.match(/\d+/) && termTwo.match(/\-\d+/)) {
			if(termOne === "1")
				return termTwo;
			
			let val = parseFloat(termOne) * parseFloat(termTwo.split(/\-/)[1]);
			return "-" + String(val);
		}
};

//factorial function... gon be needing 
//it
let fact = function(n) {
	if(n == 0)
	 return 1;
	
	return n * fact(n - 1);
}

//this method returns an array containing the lastElements of all the arrays supplied as argument
let lastElements = function(majArr) {
  let a = majArr.map(arr => {return arr[arr.length - 1]});
  return a;
}

//exporting em
exports.prod = prod;
exports.fact = fact;
exports.lastElements = lastElements;