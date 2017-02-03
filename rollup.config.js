import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'

export default {
    entry: 'src/js/index.js',
    dest: 'build/js/index.js',
    plugins: [
        eslint(),
        babel({
            exclude: 'node_modules/**'
        })
    ],
    format: 'iife',
    sourceMap: 'inline'
}
