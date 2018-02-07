import { expect } from 'chai';
import { factory } from 'spyfu-vue-factory';
import functional from '../../lib';
import sinon from 'sinon';

//
// factory
//
const render = factory({
    components: {
        'v-all': {
            functional: true,
            render: (h, context) => <div { ...functional.bindAll(context) } />,
        },
        'v-attributes': {
            functional: true,
            render: (h, context) => <div { ...functional.bindAttributes(context) } />,
        },
        'v-directives': {
            functional: true,
            render: (h, context) => <div { ...functional.bindDirectives(context) } />,
        },
        'v-event-listeners': {
            functional: true,
            render: (h, context) => <div { ...functional.bindEventListeners(context) } />,
        },
        'v-class': {
            functional: true,
            render: (h, context) => <div { ...functional.bindClasses(context) } />,
        },
        'v-dynamic-class': {
            functional: true,
            render: (h, context) => <div { ...functional.bindDynamicClasses(context) } />,
        },
        'v-static-class': {
            functional: true,
            render: (h, context) => <div { ...functional.bindStaticClasses(context) } />,
        },
        'v-style': {
            functional: true,
            render: (h, context) => <div { ...functional.bindStyles(context) } />,
        },
        'v-dynamic-style': {
            functional: true,
            render: (h, context) => <div { ...functional.bindDynamicStyles(context) } />,
        },
        'v-static-style': {
            functional: true,
            render: (h, context) => <div { ...functional.bindStaticStyles(context) } />,
        },
        'v-key': {
            functional: true,
            render: (h, context) => <div { ...functional.bindKey(context) } />
        },
        'v-scope-id': {
            functional: true,
            render: (h, context) => <div { ...functional.bindScopeId(context) } />
        },
    },
});

//
// tests
//
describe('functional bindings', () => {
    let vm;

    beforeEach(() => {
        vm = undefined;
    });

    afterEach(() => {
        if (vm && vm.$destroy) {
            vm.$destroy();
        }
    });

    it('bindAll', (done) => {
        const onClick = sinon.spy();

        vm = render({
            data: () => ({ show: false }),
            methods: { onClick },
            template: `<v-all
                v-show="show"
                id="foo"
                class="foo"
                key="bar"
                style="color: red"
                :class="{ bar: true, baz: false }"
                :style="{ border: '1px' }"
                @click="onClick"
            />`
        });

        // attributes
        expect(vm.$el.getAttribute('id')).to.equal('foo');

        // classes
        expect(vm.$el.classList.contains('foo')).to.be.true;
        expect(vm.$el.classList.contains('bar')).to.be.true;
        expect(vm.$el.classList.contains('baz')).to.be.false;

        // styles
        expect(vm.$el.style.color).to.equal('red');
        expect(vm.$el.style.border).to.equal('1px');

        // events
        vm.$el.click();
        expect(onClick.called).to.be.true;

        // directives
        expect(vm.$el.style.display).to.equal('none');
        vm.show = true;

        // key
        expect(vm._vnode.key).to.equal('bar');

        vm.$nextTick(() => {
            expect(vm.$el.style.display).to.equal('');
            done();
        });
    });

    it('bindAttributes', () => {
        vm = render({ template: `<v-attributes id="foo" />` });
        expect(vm.$el.getAttribute('id')).to.equal('foo');
    });

    it('bindDirectives', (done) => {
        vm = render({
            directives: {
                'bling': {
                    bind(el) {
                        el.classList.add('bingBangBoom');
                    }
                }
            },
            data: () => ({ show: true }),
            template: `<v-directives v-show="show" v-bling=""/>`,
        });

        expect(vm.$el.style.display).to.equal('');

        vm.show = false;
        vm.$nextTick(() => {
            expect(vm.$el.style.display).to.equal('none');
            expect(vm.$el.classList.contains('bingBangBoom')).to.be.true;
            done();
        });
    });

    it('bindEventListeners', () => {
        const onClick = sinon.stub();

        vm = render({
            methods: { onClick },
            template: `<v-event-listeners @click="onClick" />`,
        });

        vm.$el.click();
        expect(onClick.called).to.be.true;
    });

    it('bindKey', () => {
        vm = render({ template: `<v-key key="foo" />` });

        expect(vm._vnode.key).to.equal('foo');
    });

    describe('classes', () => {
        it('bindClasses', () => {
            vm = render({ template: `<v-class class="foo" :class="{ bar: true, baz: false }" />` });
            expect(vm.$el.classList.contains('foo')).to.be.true;
            expect(vm.$el.classList.contains('bar')).to.be.true;
            expect(vm.$el.classList.contains('baz')).to.be.false;
        });

        it('bindDynamicClasses (string)', () => {
            vm = render({ template: `<v-dynamic-class :class="'foo'" />` });
            expect(vm.$el.classList.contains('foo')).to.be.true;
        });

        it('bindDynamicClasses (array)', () => {
            vm = render({ template: `<v-dynamic-class :class="['foo']" />` });
            expect(vm.$el.classList.contains('foo')).to.be.true;
        });

        it('bindDynamicClasses (object)', () => {
            vm = render({ template: `<v-dynamic-class :class="{ foo: true, bar: false }" />` });
            expect(vm.$el.classList.contains('foo')).to.be.true;
            expect(vm.$el.classList.contains('bar')).to.be.false;
        });

        it('bindStaticClasses', () => {
            vm = render({ template: `<v-static-class class="foo" />` });
            expect(vm.$el.classList.contains('foo')).to.be.true;
        });
    });

    describe('styles', () => {
        it('bindStyles', () => {
            vm = render({ template: `<v-style style="font-size: 48px" :style="{ color: 'green' }" />` });
            expect(vm.$el.style.color).to.equal('green');
            expect(vm.$el.style.fontSize).to.equal('48px');
        });

        it('bindDynamicStyles', () => {
            vm = render({ template: `<v-dynamic-style :style="{ color: 'blue' }" />` });
            expect(vm.$el.style.color).to.equal('blue');
        });

        it('bindStaticStyles', () => {
            vm = render({ template: `<v-static-style style="color: red" />` });
            expect(vm.$el.style.color).to.equal('red');
        });

        it('bindScopeId', () => {
            vm = render({
                _scopeId: 'data-v-123',
                template: `<v-scope-id />`,
            });

            expect(vm.$el.outerHTML).to.equal(`<div data-v-123=""></div>`);
        });
    });
});
