(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.spyfuVueFunctional = factory());
}(this, (function () { 'use strict';

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// helper function to normalize component attributes
var normalize = function normalize(attrs) {
    return Object.assign({ attrs: {}, class: [], on: {}, style: {} }, attrs);
};

var index = {
    // bind all context data
    bindAll: function bindAll(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        attrs = normalize(attrs);

        attrs = this.bindAttributes(context, attrs, true);
        attrs = this.bindStyles(context, attrs, true);
        attrs = this.bindClasses(context, attrs, true);
        attrs = this.bindDirectives(context, attrs, true);
        attrs = this.bindEventListeners(context, attrs, true);

        return attrs;
    },


    // bind element attributes
    bindAttributes: function bindAttributes(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.attrs) {
            attrs.attrs = context.data.attrs;
        }

        return attrs;
    },


    // bind directives
    bindDirectives: function bindDirectives(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.directives) {
            var directives = context.data.directives;

            // v-show

            if (directives.find(function (_ref) {
                var name = _ref.name,
                    value = _ref.value;
                return name === 'show' && !value;
            })) {
                attrs.style.display = 'none';
            }
        }

        return attrs;
    },


    // bind both static and dynamic classes
    bindClasses: function bindClasses(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        attrs = this.bindDynamicClasses(context, attrs);
        attrs = this.bindStaticClasses(context, attrs);

        return attrs;
    },


    // bind dynamic classes
    bindDynamicClasses: function bindDynamicClasses(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.class) {
            if (Array.isArray(context.data.class)) {
                var _attrs$class;

                (_attrs$class = attrs.class).push.apply(_attrs$class, toConsumableArray(context.data.class));
            } else {
                Object.keys(context.data.class).filter(function (className) {
                    return context.data.class[className];
                }).forEach(function (className) {
                    return attrs.class.push(className);
                });
            }
        }

        return attrs;
    },


    // bind dynamic styles
    bindDynamicStyles: function bindDynamicStyles(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.style) {
            attrs.style = Object.assign({}, attrs.style, context.data.style);
        }

        return attrs;
    },


    // bind event listeners
    bindEventListeners: function bindEventListeners(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.listeners) {
            attrs.on = Object.assign({}, attrs.on, context.listeners);
        }

        return attrs;
    },


    // bind static classes
    bindStaticClasses: function bindStaticClasses(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.staticClass) {
            attrs.class.push(context.data.staticClass);
        }

        return attrs;
    },


    // bind static styles
    bindStaticStyles: function bindStaticStyles(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.staticStyle) {
            attrs.style = Object.assign({}, attrs.style, context.data.staticStyle);
        }

        return attrs;
    },


    // bind static and dynamic styles
    bindStyles: function bindStyles(context) {
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        attrs = this.bindDynamicStyles(context, attrs);
        attrs = this.bindStaticStyles(context, attrs);

        return attrs;
    }
};

return index;

})));
//# sourceMappingURL=spyfu-vue-functional.js.map
