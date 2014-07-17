function CalcModel(options){
	this.attributes = {
		type : "",
		height : 0,
		width : 0,
		color : "",
		bodyColor : "",
		border : "",
		
	}

	this.initialize(options);
}
CalcModel.prototype.initialize = function(options) {
	if (typeof (options) !== 'undefined') {
		var attributes = this.attributes;
		for ( var key in options) {
			if (this.checkType(key, options[key]) === true) {
				attributes[key] = options[key];
			} else {
				throw new Error("CalcModel.initialize : required value for "
						+ key + " is not in correct formate");
			}
		}
	}
}

CalcModel.prototype.isLeftOperandDefined = function() {
	return (this.attributes.firstOperand !== undefined);
};

CalcModel.prototype.setDecimalToRightOperand = function() {
	this.attributes.secondOperand = this.attributes.secondOperand.toFixed(1);
};

CalcModel.prototype.setDecimalToLeftOperand = function() {
	this.attributes.firstOperand = this.attributes.firstOperand.toFixed(1);
};

CalcModel.prototype.isRightOperandDefined = function() {
	return (this.attributes.secondOperand !== undefined);
};

CalcModel.prototype.isOperatorDefined = function() {
	return (this.attributes.operator !== undefined);
};

CalcModel.prototype.concatenateToRightOperand = function(numberToConcatenate) {
	var number = (this.attributes.secondOperand ? this.attributes.secondOperand +'' + numberToConcatenate : numberToConcatenate);
	this.attributes.secondOperand = new Number(number).valueOf();
};

CalcModel.prototype.concatenateToLeftOperand = function(numberToConcatenate) {
	var number = (this.attributes.firstOperand ? this.attributes.firstOperand +'' + numberToConcatenate : numberToConcatenate);
	this.attributes.firstOperand = new Number(number).valueOf();
};

CalcModel.prototype.setLeftOperand = function(number) {
	if(number){
		this.attributes.firstOperand = new Number(number).valueOf();
	}else{
		throw new Error("invalid number to set");
	}
};

CalcModel.prototype.calculate = function() {
	var operator = this.getOperator();
	var leftOperand = this.getLeftOperand();
	var rightOperand = this.getRightOperand();

	if(operator === "+"){
		return (leftOperand + rightOperand);
	}else if(operator === "-"){
		return (leftOperand - rightOperand);
	}else if(operator === "/"){
		return (leftOperand / rightOperand);
	}else if(operator === "X"){
		return (leftOperand * rightOperand);
	}else{
		throw new Error("invalid state to calculate");
	}
};

CalcModel.prototype.getLeftOperand = function() {
	return this.attributes.firstOperand;//return copy / clone
};


CalcModel.prototype.getRightOperand = function() {
	return this.attributes.secondOperand;//return copy / clone
};


CalcModel.prototype.getOperator = function() {
	return this.attributes.operator;
};

CalcModel.prototype.setRightOperand = function(number) {
	if(number){
		this.attributes.secondOperand = new Number(number).valueOf();	
	}else{
		throw new Error("invalid number to set");
	}
};


CalcModel.prototype.setOperator = function(operator) {
	if('+'===operator || '-'===operator || 'X' ===operator || '/' === operator){
		this.attributes.operator = operator;	
	}else{
		throw new Error("operator not supported");
	}
};

CalcModel.prototype.resetOperandsAndOperator = function() {
	this.attributes.firstOperand = undefined;
	this.attributes.secondOperand = undefined;
	this.attributes.operator = undefined;
	this.attributes.result = undefined;
};

CalcModel.prototype.checkType = function(key, value) {
	//it will check the type of value and accordingly decide that provided button property is valid or not 
	if ((key === "type" || key === "color" || key === "bodyColor" || key === "border")
			&& typeof (value) === "string") {
		return true;
	} else if ((key === "height" || key === "width")
			&& (value !== "" && !isNaN(value) && Math.round(value) === value)) {
		return true;
	} else {
		return false;
	}
}


package.CALC.calculator.model = CalcModel;
