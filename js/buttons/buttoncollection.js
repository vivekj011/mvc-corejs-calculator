function ButtonCollection(options) {
	this.model = package.CALC.buttons.button.model;
	this.attributes = {};
	this.initialize(options);
}

ButtonCollection.prototype.initialize = function(options) {
	if (typeof (options) !== 'undefined' && options instanceof Array) {
		for (var index = 0; index < options.length; index++) {
			this.add(new package.CALC.buttons.button.model(options[index]));
		}
	} else {
		throw new Error('ButtonCollection.initialize : options are not in correct format');
	}
}

ButtonCollection.prototype.add = function(model) {
	if (model instanceof this.model) {
		this.attributes["id-" + model.attributes.actualValue] = model;
	}
}

ButtonCollection.prototype.get = function(key) {
	return this.attributes["id-" + key];
}

ButtonCollection.prototype.getAll = function() {
	var attributes = [];
	for ( var key in this.attributes) {
		attributes.push(this.attributes[key]);
	}
	return attributes;
}

package.CALC.buttons.collection = ButtonCollection;
