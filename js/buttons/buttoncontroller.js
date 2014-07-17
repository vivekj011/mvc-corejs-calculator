function ButtonController(options){
	this.buttonClickedCallback = options.callback;
	this.model = options.buttonModel;
	this.view - new package.CALC.buttons.button.view({
														el : options.el,
														model : this.model,
														callback : this.buttonClicked.bind(this)
													});
}

ButtonController.prototype.buttonClicked = function(options) {
	debugger;
	this.buttonClickedCallback.call(this,options);
};

package.CALC.buttons.button.controller = ButtonController;
