function ButtonGroupController(options){
	this.collection = new package.CALC.buttons.collection(options.buttons);

	var buttons = [];
	var buttonsColl = this.collection.getAll();
	for (var i =0; i < buttonsColl.length; i++) {
		var buttonModel = buttonsColl[i];
		var button = new package.CALC.buttons.button.controller({
																	el : options.el,//button-container
																	buttonModel : buttonModel																	
																});

		buttons.push(button);
	}

	this.buttonGroupView = new package.CALC.buttons.buttonGroupView({
																		callback : this.buttonClicked.bind(this)
																	});

}

ButtonGroupController.prototype = new package.CALC.parentClass();
ButtonGroupController.prototype.constructor = ButtonGroupController;

ButtonGroupController.prototype.buttonClicked = function(options) {
	var buttonData = this.collection.get(options);
	this.fireEvent("buttonClicked",buttonData.attributes);
};



package.CALC.buttons.buttonGroupController = ButtonGroupController;
