function CalcController(options){
	this.$el = options.el;
	this.model = new package.CALC.calculator.model(options.calculatorAttr);
	this.render(options);
	this.initChildren(options);
	this.addEvents(options);
}

CalcController.prototype = new package.CALC.parentClass();
CalcController.prototype.constructor = CalcController;


CalcController.prototype.render = function(options) {
	this.view = new package.CALC.calculator.view({
		el : this.$el
	});
};

CalcController.prototype.initChildren = function(options) {
	this.buttonGroupController = new package.CALC.buttons.buttonGroupController({
		el : this.$el.querySelectorAll('.button-container > .container > .buttonsdiv')[0],
		buttons : buttons
	});
	
	this.displayController = new package.CALC.display.controller({
		el : this.$el.querySelectorAll('.display-container')[0]
	});
};

CalcController.prototype.addEvents = function(options) {
	this.addEventListener("buttonClicked", this.buttonClicked, this);
};

CalcController.prototype.buttonClicked = function(options) {
	if('operand' === options.type){
		if(this.model.attributes.firstOperand && this.model.attributes.operator){
			this.model.attributes.secondOperand = new Number((this.model.attributes.secondOperand ? (this.model.attributes.secondOperand+options.actualValue) : options.actualValue));
			this.displayController.setData(this.model.attributes.secondOperand);
		}else{
			this.model.attributes.firstOperand = new Number((this.model.attributes.firstOperand ? (this.model.attributes.firstOperand+''+options.actualValue) : options.actualValue));
			this.displayController.setData(this.model.attributes.firstOperand);
		}
	}else if('operator' === options.type){
		if(this.model.attributes.firstOperand && this.model.attributes.operator && this.model.attributes.secondOperand){
			var result = this.calculate(this.model.attributes.firstOperand, this.model.attributes.operator,this.model.attributes.secondOperand);
			this.displayController.setData(result);
		}else if(this.model.attributes.result){
			this.model.attributes.firstOperand = new Number(result);
			this.model.attributes.operator = options.actualValue;
		}else{
			this.model.attributes.operator = options.actualValue;
		}

		if('calculate' === options.actualValue){
			var result = this.calculate(this.model.attributes.firstOperand, this.model.attributes.operator,this.model.attributes.secondOperand);
			this.displayController.setData(result);

			this.model.attributes.firstOperand = undefined;
			this.model.attributes.secondOperand = undefined;
			this.model.attributes.operator= undefined;
			this.model.attributes.result = result;
		}
		
	}else if('clear' === options.type){
		this.clearData(options);
	}else if('decimal' === options.type){
		if(this.model.attributes.secondOperand){
			this.model.attributes.secondOperand += "" + options.actualValue;
			this.displayController.setData(this.model.attributes.secondOperand);
		}else{
			this.model.attributes.firstOperand += "" + options.actualValue;
			this.displayController.setData(this.model.attributes.firstOperand);
		}
	}
};
CalcController.prototype.clearData = function(options) {
	var modelAttributes = this.model.attributes;
	modelAttributes.firstOperand = undefined;
	modelAttributes.operator = undefined;
	modelAttributes.secondOperand = undefined;
	modelAttributes.total = undefined;

	this.displayController.clearData();
};

CalcController.prototype.calculate = function(firstOperand,operator,secondOperand) {
	if(operator === "+"){
		debugger;
		return firstOperand + secondOperand;
	}else if(operator === "-"){
		return firstOperand - secondOperand;
	}else if(operator === "/"){
		return firstOperand / secondOperand;
	}else if(operator === "X"){
		return firstOperand * secondOperand;
	}
};

package.CALC.calculator.controller = CalcController;
