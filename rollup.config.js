import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import uglify from '@lopatnov/rollup-plugin-uglify';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import pkg from './package.json';

const transformStyles = postcss({
  extract: 'dist/aos.css',
  plugins: [autoprefixer, cssnano]
});

const input = 'src/js/aos.js';

const babelOptions = {
  babelHelpers: 'inline',
  exclude: ['node_modules/**']
}

export default [
  {
    input,
    output: {
      file: pkg.browser,
      name: 'AOS',
      format: 'umd',
      sourcemap: process.env.NODE_ENV === 'dev'
    },
    plugins: [
      transformStyles,
      resolve(),
      commonjs(),
      babel(babelOptions),
      uglify()
    ]
  },
  {
    input,
    external: Object.keys(pkg.dependencies),
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      transformStyles,
      babel(babelOptions)
    ]
  }
];
