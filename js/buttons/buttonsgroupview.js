function ButtonGroupView(options){
	this.$el = options.el;
	this.callback = options.callback;
	this.addEvents(options.callback);
}

ButtonGroupView.prototype.addEvents = function(callback) {
	debugger;
	var buttonsDiv = document.getElementsByClassName("buttonsdiv")[0];
	if (typeof (buttonsDiv) !== 'undefined') {
		buttonsDiv.addEventListener('click', function(e) {
			debugger;
				callback.call(this, e.target.getAttribute('data-actualvalue'));
		});
	}
};

package.CALC.buttons.buttonGroupView = ButtonGroupView;
