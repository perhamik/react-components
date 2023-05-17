/**
 * NOTE: There is currently an open issue for adding 'use client' directive
 * https://github.com/rollup/rollup/issues/4699
 */

import {fileURLToPath} from 'node:url'
import {createRequire} from 'node:module'

import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import preserveDirectives from 'rollup-plugin-preserve-directives'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import scss from 'rollup-plugin-scss'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

/**
 * Used for generating external dependencies
 * Credit: Mateusz Burzyński (https://github.com/Andarist)
 * Source: https://github.com/rollup/rollup-plugin-babel/issues/148#issuecomment-399696316
 */
const makeExternalPredicate = (externalArr) => {
	if (externalArr.length === 0) {
		return () => false
	}
	const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
	return (id) => pattern.test(id)
}

const babelRuntimeVersion = pkg.dependencies['@babel/runtime'].replace(/^[^0-9]*/, '')

const commonOptions = {
	interop: 'auto',
	sourcemap: true,
	globals: {
		react: 'React',
		'@src/lib': 'lib',
	},
	banner: `/*
 * React Components
 * {@link https://github.com/perhamik/react-components}
 * @copyright Denys Yaroshenko (@perhamik)
 * @license MIT
 */`,
}

const outputOptions = {
	exports: 'named',
	preserveModules: true,
	...commonOptions,
}

const analyzeOptions = {
	hideDeps: true,
	limit: 0,
	summaryOnly: true,
}

const cssOptions = {
	preprocessor: (_, id) =>
		new Promise((resolve) => {
			const result = scss.renderSync({file: id})
			resolve({code: result.css.toString()})
		}),
	minimize: true,
	modules: true,
}

const tsConfig = {
	tsconfig: './tsconfig.json',
	declaration: true,
	emitDeclarationOnly: true,
	declarationDir: './types',
	outDir: './dist',
}

const commonConfig = {
	input: 'src/index.ts',
	external: makeExternalPredicate([
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
		'src/lib',
		'@src/lib',
	]),
	onwarn(warning, warn) {
		if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
			warn(warning)
		}
	},
}

const defaultConfig = {
	...commonConfig,

	plugins: [
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
		analyze({...analyzeOptions}),
	],
}

const config = [
	{
		...commonConfig,
		plugins: [typescript({...tsConfig}), postcss({...cssOptions}), analyze({...analyzeOptions})],
		output: [
			{
				file: 'dist/umd/index.js',
				format: 'umd',
				name: pkg.name,
				...commonOptions,
			},
		],
	},
	{
		input: 'dist/umd/types/src/index.d.ts',
		output: [{file: 'dist/index.d.ts', format: 'umd'}],
		plugins: [dts(), analyze({...analyzeOptions})],
		external: [/\.scss$/, '@src/lib'],
	},
	{
		...defaultConfig,
		output: [
			{
				dir: 'dist/esm',
				format: 'esm',
				...outputOptions,
				plugins: [],
			},
		],
		plugins: [
			typescript({...tsConfig, outDir: 'dist/esm', declarationDir: 'dist/esm/types'}),
			...defaultConfig.plugins,
		],
	},
	{
		...defaultConfig,
		output: [
			{
				dir: 'dist/cjs',
				format: 'cjs',
				...outputOptions,
			},
		],
		plugins: [
			typescript({...tsConfig, outDir: 'dist/cjs', declarationDir: 'dist/cjs/types'}),
			...defaultConfig.plugins,
		],
	},
]

export default config
