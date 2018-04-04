var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// helper function to normalize component attributes
var normalize = function normalize(context, attrs) {
    // first test if the component is functional
    if (!context) {
        throw new TypeError('[spyfu-vue-functional]: Non-functional components cannot use functional binding helpers.');
    }

    return Object.assign({
        attrs: {},
        class: [],
        directives: [],
        on: {},
        style: {}
    }, attrs);
};

// bind all context data
function bindAll(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    attrs = normalize(context, attrs);

    attrs = bindAttributes(context, attrs, true);
    attrs = bindStyles(context, attrs, true);
    attrs = bindClasses(context, attrs, true);
    attrs = bindDirectives(context, attrs, true);
    attrs = bindEventListeners(context, attrs, true);
    attrs = bindScopeId(context, attrs, true);

    return attrs;
}

// bind element attributes
function bindAttributes(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.attrs) {
        attrs.attrs = context.data.attrs;
    }

    return attrs;
}

// bind directives
function bindDirectives(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(context, attrs);
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
}

// bind both static and dynamic classes
function bindClasses(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    attrs = bindDynamicClasses(context, attrs);
    attrs = bindStaticClasses(context, attrs);

    return attrs;
}

// bind dynamic classes
function bindDynamicClasses(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.class) {
        if (typeof context.data.class === 'string') {
            var _attrs$class;

            (_attrs$class = attrs.class).push.apply(_attrs$class, toConsumableArray(context.data.class.split(' ')));
        } else if (Array.isArray(context.data.class)) {
            var _attrs$class2;

            (_attrs$class2 = attrs.class).push.apply(_attrs$class2, toConsumableArray(context.data.class));
        } else {
            Object.keys(context.data.class).filter(function (className) {
                return context.data.class[className];
            }).forEach(function (className) {
                return attrs.class.push(className);
            });
        }
    }

    return attrs;
}

// bind dynamic styles
function bindDynamicStyles(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.style) {
        attrs.style = Object.assign({}, attrs.style, context.data.style);
    }

    return attrs;
}

// bind event listeners
function bindEventListeners(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.listeners) {
        attrs.on = Object.assign({}, attrs.on, context.listeners);
    }

    return attrs;
}

// bind css scope id
function bindScopeId(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(attrs);
    }

    if (context.parent && context.parent.$options._scopeId) {
        attrs.attrs[context.parent.$options._scopeId] = '';
    }

    return attrs;
}

// bind static classes
function bindStaticClasses(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.staticClass) {
        attrs.class.push(context.data.staticClass);
    }

    return attrs;
}

// bind static styles
function bindStaticStyles(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.staticStyle) {
        attrs.style = Object.assign({}, attrs.style, context.data.staticStyle);
    }

    return attrs;
}

// bind static and dynamic styles
function bindStyles(context) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isNormalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    attrs = bindDynamicStyles(context, attrs);
    attrs = bindStaticStyles(context, attrs);

    return attrs;
}

export { bindAll, bindAttributes, bindDirectives, bindClasses, bindDynamicClasses, bindDynamicStyles, bindEventListeners, bindScopeId, bindStaticClasses, bindStaticStyles, bindStyles };
//# sourceMappingURL=spyfu-vue-functional.esm.js.map
