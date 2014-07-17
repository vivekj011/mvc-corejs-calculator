function CalcView(options){
	this.$el = options.el;
	this.render(options);
}

CalcView.prototype.render = function(options) {
	var template = getTemplate(options);

	this.$el.setAttribute( "class", "theme-calculator" );
	this.$el.appendChild(template);
};

function getTemplate() {
	var frag = document.createDocumentFragment();

	var div = document.createElement("div");
	div.setAttribute( "class", "display-container" );
	frag.appendChild(div);
	


	div = document.createElement("div");
	div.setAttribute( "class", "button-container" );

	var container = document.createElement("div");
	container.setAttribute( "class", "container" );	

	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	div2.setAttribute( "class", "buttonsdiv" );	
	
	container.appendChild(div1);
	container.appendChild(div2);

	div.appendChild(container);

	frag.appendChild(div);
	
	return frag;
}


package.CALC.calculator.view = CalcView;
