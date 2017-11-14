import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);
let isProduction = process.env.NODE_ENV === 'production';

let targets = [];
let plugins = [babel(babelrc())];

//
// production config
//
if (isProduction) {
    targets.push(
        {
            dest: pkg.main,
            format: 'umd',
            moduleName: 'spyfuVueFunctional',
            sourcemap: true,
        },
        {
            dest: pkg.module,
            format: 'es',
            sourcemap: true,
        }
    )
}

//
// non-production config
//
else {
    plugins.push(istanbul({
        exclude: [
            'test/**/*',
            'node_modules/**/*',
        ] ,
    }));
}

export default {
    entry: 'lib/index.js',
    exports: 'named',
    external: external,
    plugins: plugins,
    targets: targets,
};
