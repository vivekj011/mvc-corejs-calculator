function DispalyModel(options) {
	this.attributes = {
		type : ""
	};
	this.initialize(options);
}

DispalyModel.prototype.initialize = function(options) {
	//to override the default values of the model
	if (typeof (options) !== 'undefined') {
		var attributes = this.attributes;
		for ( var key in options) {
			if (this.checkType(key, options[key]) === true) {
				attributes[key] = options[key];
			} else {
				throw new Error("buttonModel.initialize : required value for "
						+ key + " is not in correct formate");
			}
		}
	}
}

DispalyModel.prototype.checkType = function(key, value) {
	//to check the type of value and accordingly decide that provided button property is valid or not
	if (key === "type" && typeof (value) === "string") {
		return true;
	} else {
		return false;
	}
}

package.CALC.display.model = DispalyModel;
