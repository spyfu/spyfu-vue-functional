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
            file: pkg.main,
            format: 'umd',
            name: 'spyfuVueFunctional',
            sourcemap: true,
        },
        {
            file: pkg.module,
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
    exports: 'named',
    external: external,
    input: 'lib/index.js',
    output: targets,
    plugins: plugins,
};
