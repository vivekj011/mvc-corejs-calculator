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
	var model = this.model;
	if('operand' === options.type){
		if(model.isRightOperandDefined() || model.isOperatorDefined()){
			model.concatenateToRightOperand(options.actualValue);
			var dataToDisplay = model.getLeftOperand() + ' ' + model.getOperator() + ' ' + model.getRightOperand();
			this.setData(dataToDisplay);
		}else{
			model.concatenateToLeftOperand(options.actualValue);
			this.setData(model.getLeftOperand());
		}
	}else if('operator' === options.type){
		if('calculate' === options.actualValue && (model.isLeftOperandDefined() && model.isOperatorDefined() && model.isRightOperandDefined())){
			var result = model.calculate();
			this.setData(result);
			model.resetOperandsAndOperator();
			model.setLeftOperand(result);
		}

		if(model.isLeftOperandDefined() && model.isOperatorDefined() && model.isRightOperandDefined()){
			var result = model.calculate();
			this.setData(result);
			model.resetOperandsAndOperator();
			model.setLeftOperand(result);
			model.setOperator(options.actualValue);	
		}else if(model.isLeftOperandDefined()){
			model.setOperator(options.actualValue);
			var dataToDisplay = model.getLeftOperand() + ' ' + model.getOperator(); 	
			this.setData(dataToDisplay);
		}
	}else if('clear' === options.type){
		this.clearData(options);
	}else if('decimal' === options.type){
		if(model.isRightOperandDefined()){
			model.setDecimalToRightOperand();			
			this.setData(model.getRightOperand());
		}else{
			model.setDecimalToLeftOperand();						
			this.setData(model.getLeftOperand());
		}
	}
};
CalcController.prototype.clearData = function(options) {
	this.model.resetOperandsAndOperator();
	this.displayController.clearData();
};

CalcController.prototype.setData = function(dataToSet) {
	this.displayController.setData(dataToSet);
};

package.CALC.calculator.controller = CalcController;
