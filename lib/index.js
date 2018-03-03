// helper function to normalize component attributes
const normalize = (context, attrs) => {
    // first test if the component is functional
    if (!context) {
        throw new TypeError(`[spyfu-vue-functional]: Non-functional components cannot use functional binding helpers.`);
    }
    
    return Object.assign({ 
        attrs: {}, 
        class: [], 
        on: {}, 
        style: {} 
    }, attrs);
}

// bind all context data
export function bindAll(context, attrs = {}) {
    attrs = normalize(context, attrs);

    attrs = this.bindAttributes(context, attrs, true);
    attrs = this.bindStyles(context, attrs, true);
    attrs = this.bindClasses(context, attrs, true);
    attrs = this.bindDirectives(context, attrs, true);
    attrs = this.bindEventListeners(context, attrs, true);

    return attrs;
}

// bind element attributes
export function bindAttributes(context, attrs = {}, isNormalized = false) {
    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.attrs) {
        attrs.attrs = context.data.attrs;
    }

    return attrs;
}

// bind directives
export function bindDirectives(context, attrs = {}, isNormalized = false) {
    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.directives) {
        const { directives } = context.data;

        // v-show
        if (directives.find(({ name, value }) => name === 'show' && !value)) {
            attrs.style.display = 'none';
        }
    }

    return attrs;
}

// bind both static and dynamic classes
export function bindClasses(context, attrs = {}, isNormalized = false) {
    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    attrs = this.bindDynamicClasses(context, attrs);
    attrs = this.bindStaticClasses(context, attrs);

    return attrs;
}

// bind dynamic classes
export function bindDynamicClasses(context, attrs = {}, isNormalized = false) {
    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.class) {
        if (Array.isArray(context.data.class)) {
            attrs.class.push(...context.data.class);
        } else {
            Object.keys(context.data.class)
                .filter(className => context.data.class[className])
                .forEach(className => attrs.class.push(className));
        }
    }

    return attrs;
}

// bind dynamic styles
export function bindDynamicStyles(context, attrs = {}, isNormalized = false) {
    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.style) {
        attrs.style = Object.assign({}, attrs.style, context.data.style);
    }

    return attrs;
}

// bind event listeners
export function bindEventListeners(context, attrs = {}, isNormalized = false) {
    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.listeners) {
        attrs.on = Object.assign({}, attrs.on, context.listeners);
    }

    return attrs;
}

// bind static classes
export function bindStaticClasses(context, attrs = {}, isNormalized = false) {
    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.staticClass) {
        attrs.class.push(context.data.staticClass);
    }

    return attrs;
}

// bind static styles
export function bindStaticStyles(context, attrs = {}, isNormalized = false) {
    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    if (context.data && context.data.staticStyle) {
        attrs.style = Object.assign({}, attrs.style, context.data.staticStyle);
    }

    return attrs;
}

// bind static and dynamic styles
export function bindStyles(context, attrs = {}, isNormalized = false) {
    if (!isNormalized) {
        attrs = normalize(context, attrs);
    }

    attrs = this.bindDynamicStyles(context, attrs);
    attrs = this.bindStaticStyles(context, attrs);

    return attrs;
}
