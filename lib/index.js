// helper function to normalize component attributes
const normalize = attrs => Object.assign({ attrs: {}, class: [], on: {}, style: {} }, attrs);

export default {
    // bind all context data
    bindAll(context, attrs = {}) {
        attrs = normalize(attrs);

        attrs = this.bindAttributes(context, attrs, true);
        attrs = this.bindStyles(context, attrs, true);
        attrs = this.bindClasses(context, attrs, true);
        attrs = this.bindDirectives(context, attrs, true);
        attrs = this.bindEventListeners(context, attrs, true);

        return attrs;
    },

    // bind element attributes
    bindAttributes(context, attrs = {}, isNormalized = false) {
        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.attrs) {
            attrs.attrs = context.data.attrs;
        }

        return attrs;
    },

    // bind directives
    bindDirectives(context, attrs = {}, isNormalized = false) {
        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.directives) {
            const { directives } = context.data;

            // v-show
            if (directives.find(({ name, value }) => name === 'show' && !value)) {
                attrs.style.display = 'none';
            }

            attrs.directives = directives.filter(({ name }) => name !== 'show');
        }

        return attrs;
    },

    // bind both static and dynamic classes
    bindClasses(context, attrs = {}, isNormalized = false) {
        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        attrs = this.bindDynamicClasses(context, attrs);
        attrs = this.bindStaticClasses(context, attrs);

        return attrs;
    },

    // bind dynamic classes
    bindDynamicClasses(context, attrs = {}, isNormalized = false) {
        if (!isNormalized) {
            attrs = normalize(attrs);
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
    },

    // bind dynamic styles
    bindDynamicStyles(context, attrs = {}, isNormalized = false) {
        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.style) {
            attrs.style = Object.assign({}, attrs.style, context.data.style);
        }

        return attrs;
    },

    // bind event listeners
    bindEventListeners(context, attrs = {}, isNormalized = false) {
        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.listeners) {
            attrs.on = Object.assign({}, attrs.on, context.listeners);
        }

        return attrs;
    },

    // bind static classes
    bindStaticClasses(context, attrs = {}, isNormalized = false) {
        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.staticClass) {
            attrs.class.push(context.data.staticClass);
        }

        return attrs;
    },

    // bind static styles
    bindStaticStyles(context, attrs = {}, isNormalized = false) {
        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        if (context.data && context.data.staticStyle) {
            attrs.style = Object.assign({}, attrs.style, context.data.staticStyle);
        }

        return attrs;
    },

    // bind static and dynamic styles
    bindStyles(context, attrs = {}, isNormalized = false) {
        if (!isNormalized) {
            attrs = normalize(attrs);
        }

        attrs = this.bindDynamicStyles(context, attrs);
        attrs = this.bindStaticStyles(context, attrs);

        return attrs;
    },
};
