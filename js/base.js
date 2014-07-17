window.package = {
	CALC : {
		parentClass : ParentClass,
		eventListeners : {},
		calculator : {
			controller : function(){},
			model : function() {},
			view : function() {}			
		},
		buttons : {
			buttonGroupController : function(){},
			buttonGroupView : function(){},
			collection : function() {},
			button : {
				controller : function(){},
				view : function() {},			    
				model : function() {}			
			}		
		},
		display : {
			controller : function() {},
			view : function() {},
			model : function() {}
		}
	}
};


var _listeners = package.CALC.eventListeners;

function ParentClass() {}

ParentClass.prototype = {
	constructor : ParentClass,
	addEventListener : function(type, listener, context) {
		if (typeof (_listeners[type]) === "undefined") {//check if event exist or not
			_listeners[type] = [];
		}
		_listeners[type].push(listener.bind(context));
	},
	fireEvent : function(event, data) {
				// invoke registered callback when particular custom event get fired
		console.log("fireEvent...");
		if (typeof (event) === "string") {
			event = {type : event};
		}
		if (!event.target) {
			event.target = this;
		}
		if (!event.type) {
			throw new Error("Type of event object is missing(falsy event)");
			}

		var listeners = _listeners[event.type];
		if ( listeners && listeners instanceof Array) {
			console.log("listeners.length : ",listeners.length);
			for (var i = 0; i < listeners.length; i++) {
				console.log("calling listener : ",i);
				listeners[i].call(this, data); // call or invoke all the listeners for this type. Currently it is synchronous. Should be Asynch
				// setTimeout may be ?
			}
		}
	}
};

package.CALC.parentClass = ParentClass;
