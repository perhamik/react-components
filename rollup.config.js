import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

import {terser} from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import pack from './package.json' assert {type: 'json'}

export default [
	{
		input: 'src/index.ts',
		plugins: [
			peerDepsExternal(),

			resolve(),
			commonjs(),
			typescript({tsconfig: './tsconfig.json'}),
			scss(),

			terser(),
		],
		external: ['react', 'sass'],
		output: [
			{
				file: pack.main,
				format: 'umd',
				sourcemap: true,
				name: 'perhamik-react-components',
				assetFileNames: '[name][extname]',
			},
		],
	},
	{
		input: 'dist/umd/types/index.d.ts',
		output: [{file: 'dist/index.d.ts', format: 'umd'}],
		plugins: [dts()],
		external: [/\.scss$/],
	},
]
