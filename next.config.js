const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// module.exports = withCss(withSass());

const path = require('path');
const Dotenv = require('dotenv-webpack');

const prod = process.env.NODE_ENV === 'production';

module.exports = withCss(
	withSass({
		webpack: (config) => {
			config.resolve.alias['@'] = path.resolve(__dirname);
			config.plugins.push(new Dotenv({ silent: true }));
			if (config.mode === 'production') {
				if (Array.isArray(config.optimization.minimizer)) {
					config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
				}
			}
			return config;
		},
		env: {
			BASE_URL: prod
				? process.env.BASE_URL_PRODUCTION
				: process.env.BASE_URL_DEVOLOPMENT,
			NAMESPACE: process.env.NAMESPACE,
			CLIENT_ID: process.env.CLIENT_ID,
		},
	})
);
