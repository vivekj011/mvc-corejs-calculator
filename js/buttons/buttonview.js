function ButtonView(options){
	this.$el = options.el;
	this.model = options.model.attributes;
	this.render(options);
}

ButtonView.prototype.render = function(options) {
	var template = this.getButtonTemplate(options);
	this.$el.appendChild(template);	
};

ButtonView.prototype.getButtonTemplate = function(options) {
	var frag = document.createDocumentFragment();

	var colDiv = document.createElement("div");
	colDiv.innerHTML = this.model.displayValue;
	colDiv.setAttribute("data-actualValue", this.model.actualValue);
	colDiv.setAttribute("class", "theme-button");
	
	frag.appendChild(colDiv);

	return frag;
};


package.CALC.buttons.button.view = ButtonView;
