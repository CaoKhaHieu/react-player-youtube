import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './index.types.ts',
  output: [{ file: 'dist/react-player-youtube.d.ts', format: 'es' }],
  plugins: [
    postcss(),
    dts({
      compilerOptions: {
        baseUrl: 'src',
      },
    }),
  ],
};
