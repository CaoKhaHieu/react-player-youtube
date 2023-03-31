import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import cleaner from 'rollup-plugin-cleaner';

export default {
  input: 'index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      exports: 'named',
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react']
    }),
    cleaner({
      targets: [
        './dist/'
      ]
    }),
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
        },
      },
    }),
  ],
};
