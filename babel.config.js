module.exports = function( api ) {
	api.cache( true );

	return {
		presets: [ '@wordpress/babel-preset-default' ],
		plugins: [
			[
				'@wordpress/babel-plugin-import-jsx-pragma',
				{
					scopeVariable: 'createElement',
					source: '@wordpress/element',
					isDefault: false,
				},
			],
		],
		env: {
			development: {
				plugins: [
					[
						'@wordpress/babel-plugin-makepot',
						{
							output: 'blocks.pot',
						},
					],
				],
			},
		},
	};
};
