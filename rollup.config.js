import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import dotenv from 'rollup-plugin-dotenv';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => {
  return (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);
};

const dedupe = importee => {
  return importee === 'svelte' || importee.startsWith('svelte/');
};

const customResolver = {
  entries: [{
    find: '@store',
    replacement: __dirname + '/src/asserts/store'
  },
  {
    find: '@fetch',
    replacement: __dirname + '/src/asserts/fetch'
  }]
};

export default {
  client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
      dotenv(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),

      alias(customResolver),

      svelte({
				dev: false,
				hydratable: true,
				emitCss: true
			}),
			commonjs(),
      resolve({
        browser: true,
        dedupe
      }),

      legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
        exclude: ['node_modules/@babel/**'],
        presets: [
          ['@babel/preset-env', {
            targets: '> 0.25%, not dead'
          }]
        ],
        plugins: [
          ['@babel/plugin-syntax-dynamic-import'],
          ['@babel/plugin-transform-runtime', {
            useESModules: true
          }]
        ]
			}),

			!dev && terser({
				module: true
			})
		],

		onwarn
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
      dotenv(),
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
      alias(customResolver),
			svelte({
				generate: 'ssr',
				dev
			}),
			resolve({
				dedupe
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
      dotenv(),
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn
	}
};
