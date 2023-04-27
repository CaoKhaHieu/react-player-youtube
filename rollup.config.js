import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import cleaner from 'rollup-plugin-cleaner';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const inputFileName = 'index.ts';
const resolveAlias = {
  '@stylesheets': './src/stylesheets',
  '@components/*': ['./src/components/*'],
  '@types/*': ['./src/types/*'],
  '@constants/*': ['./src/constants/*'],
  '@utils/*': ['./src/utils/*'],
  '@hooks/*': ['./src/hooks*'],
};

export default {
  input: inputFileName,
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
    }),
    cleaner({
      targets: ['./dist/'],
    }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    postcss(),
    alias({
      entries: resolveAlias,
    }),
    peerDepsExternal(),
  ],
};
