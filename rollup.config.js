/**
 * NOTE: There is currently an open issue for adding 'use client' directive
 * https://github.com/rollup/rollup/issues/4699
 */
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import analyze from 'rollup-plugin-analyzer'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import preserveDirectives from 'rollup-plugin-preserve-directives'
import scss from 'rollup-plugin-scss'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const makeExternalPredicate = (externalArr) => {
	if (externalArr.length === 0) {
		return () => false
	}
	const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
	return (id) => pattern.test(id)
}

const babelRuntimeVersion = pkg.dependencies['@babel/runtime'].replace(/^[^0-9]*/, '')

const outputOptions = {
	exports: 'named',
	preserveModules: true,
	interop: 'auto',
	banner: `/*
	* React Components
	* {@link https://github.com/perhamik/react-components}
	* @copyright Denys Yaroshenko (@perhamik)
	* @license MIT
	*/`,
}

const cssOptions = {
	preprocessor: (_, id) =>
		new Promise((resolve) => {
			const result = scss.renderSync({file: id})
			resolve({code: result.css.toString()})
		}),
	minimize: true,
}

const tsConfig = {
	tsconfig: 'tsconfig.json',
	emitDeclarationOnly: true,
	declarationDir: 'dist/types',
}

const config = [
	{
		input: 'index.ts',
		output: [
			{
				dir: 'dist',
				format: 'esm',
				...outputOptions,
			},
		],
		external: makeExternalPredicate([
			...Object.keys(pkg.dependencies || {}),
			...Object.keys(pkg.peerDependencies || {}),
		]),
		plugins: [
			typescript({...tsConfig}),
			alias({
				entries: {
					src: fileURLToPath(new URL('src', import.meta.url)),
				},
			}),
			postcss({...cssOptions}),
			nodeResolve(),
			commonjs({include: ['node_modules/**']}),
			babel({
				babelHelpers: 'runtime',
				exclude: /node_modules/,
				plugins: [['@babel/plugin-transform-runtime', {version: babelRuntimeVersion}]],
				presets: [
					['@babel/preset-env', {targets: 'defaults'}],
					['@babel/preset-react', {runtime: 'automatic'}],
				],
			}),
			preserveDirectives.default(),
			terser(),
			analyze({
				hideDeps: true,
				limit: 0,
				summaryOnly: true,
			}),
		],
		// Ignore warnings when using "use client" directive
		onwarn(warning, warn) {
			if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
				warn(warning)
			}
		},
	},
	{
		input: 'dist/types/src/index.d.ts',
		output: [{file: 'dist/index.d.ts', format: 'umd'}],
		plugins: [dts()],
		external: [/\.scss$/],
	},
]

export default config
