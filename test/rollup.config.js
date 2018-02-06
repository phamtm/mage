import babel from 'rollup-plugin-babel';
import progress from 'rollup-plugin-progress';
import resolve from 'rollup-plugin-node-resolve';
import flow from 'rollup-plugin-flow';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';

export default {
  entry: './test/index.test.js',
  format: 'iife',
  plugins: [
    flow(),
    resolve({ jsnext: true, main: true }),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false, loose: true }],
        'stage-2',
        'es2015-rollup',
        'preact',
      ],
      exclude: 'node_modules/**',
    }),
    progress({}),
    serve('test/'),
  ],
  dest: './test/index.js',
  sourceMap: true,
};
