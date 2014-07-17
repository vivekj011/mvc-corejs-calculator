function DisplayView(options){
	this.$el = options.el;
	this.render(options);
}

DisplayView.prototype.render = function(options) {
	var template = this.createAndGetDisplayTemplate(options);
	this.$el.appendChild(template);
};

DisplayView.prototype.createAndGetDisplayTemplate = function(options) {
	var frag = document.createDocumentFragment();

	var div = document.createElement("div");
	frag.appendChild(div);

	var input = document.createElement("input");
	input.type = "text";
	input.setAttribute("disabled", "disabled");
	input.setAttribute("class", "theme-display");
	input.setAttribute("disabled", "disabled");
	input.setAttribute("readonly", "readonly");
	div.appendChild(input);
	
	return frag;
};

DisplayView.prototype.setData = function(options) {
	var inputEle = this.$el.querySelectorAll('div > input')[0];
	inputEle.value = options;
};
DisplayView.prototype.clearData = function() {
	var inputEle = this.$el.querySelectorAll('div > input')[0];
	inputEle.value = "";
};

package.CALC.display.view = DisplayView;
