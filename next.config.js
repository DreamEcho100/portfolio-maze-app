const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
// module.exports = withCss(withSass());

const path = require('path');

module.exports = withCss(
	withSass({
		webpack: (config) => {
			config.resolve.alias['@'] = path.resolve(__dirname);
			return config;
		},
	})
);
