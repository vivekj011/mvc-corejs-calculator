function DisplayController(options) {
	this.model = new package.CALC.display.model(options.displaymodel);
	this.view = new package.CALC.display.view({
		el : options.el
	});
}

//interface methods
DisplayController.prototype.setData = function(options) {
	this.view.setData(options);
};

DisplayController.prototype.clearData = function(options) {
	this.view.clearData();
};

package.CALC.display.controller = DisplayController;
