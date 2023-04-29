import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import browsersync from 'rollup-plugin-browsersync';
import html from 'rollup-plugin-html-scaffold';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const input = 'index.tsx';
const output = [
  {
    file: 'build/index.js',
    format: 'umd',
    sourcemap: true,
    globals,
  },
];

const resolveAlias = {
  '@stylesheets': './src/stylesheets',
  '@components/*': ['./src/components/*'],
  '@types/*': ['./src/types/*'],
  '@constants/*': ['./src/constants/*'],
  '@utils/*': ['./src/utils/*'],
  '@hooks/*': ['./src/hooks*'],
};

const plugins = [
  progress(),
  html({
    input: './public/index.html',
    output: './build/index.html',
    template: { appBundle: 'index.js' },
  }),
  babel({
    exclude: 'node_modules/**',
    presets: ['@babel/preset-react'],
  }),
  cleaner({
    targets: ['./build/'],
  }),
  typescript({
    tsconfig: './tsconfig.json',
  }),
  postcss(),
  alias({
    entries: resolveAlias,
  }),
  replace({
    preventAssignment: true,
    values: {
      'process.env.NODE_ENV': JSON.stringify('development'),
    },
  }),
  resolve(),
  commonjs({
    include: 'node_modules/**',
  }),
  filesize(),
  copy({
    targets: [{ src: 'public/index.html', dest: 'build/' }],
    verbose: true,
  }),
  browsersync({
    server: 'build',
    watch: true,
    ui: false,
    open: false,
  }),
];

export default {
  input,
  output,
  plugins,
};
