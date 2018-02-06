import babel from 'rollup-plugin-babel';
import progress from 'rollup-plugin-progress';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import flow from 'rollup-plugin-flow';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [
    // flow(),
    resolve({}),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false, loose: true }],
        'stage-2',
        'preact',
      ],
      exclude: 'node_modules/**',
    }),
    progress({}),
  ],
  dest: 'dist/mage.js',
  sourceMap: true,
};
