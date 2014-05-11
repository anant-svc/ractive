(function () {

	'use strict';

	var isBuild, config, i, prefixedModules = [];

	if ( /build=true/.test( window.location.search ) || /phantomjs/i.test( window.navigator.userAgent ) ) {
		config = {
			baseUrl: '../<%= levels %>tmp/amd/',
			paths: {
				modules: '../../test/modules',
				samples: '../../test/samples',
				vendor: '../../test/vendor',
				ractive: '../ractive-legacy'
			}
		};
	} else {
		config = {
			baseUrl: '../<%= levels %>.amd/',
			paths: {
				modules: '../test/modules',
				samples: '../test/samples',
				vendor: '../test/vendor'
			}
		};
	}

	// require for asyncTest and module('',{setup}) to work
	// see http://stackoverflow.com/questions/17065488/qunit-setup-called-for-each-test-before-teardown
	QUnit.config.autostart = false;
	QUnit.config.reorder = false;
	QUnit.config.testTimeout = 2000;
	require.config( config );

	// can't use .map() because of IE...
	i = _modules.length;
	while ( i-- ) {
		prefixedModules[i] = 'modules/' + _modules[i];
	}

	require( [ 'ractive' ].concat( prefixedModules ), function ( Ractive ) {
		window.Ractive = Ractive;

		Ractive.defaults.magic = /magic=true/.test( window.location.search );

		Array.prototype.slice.call( arguments, 1 ).forEach( function ( testSet ) {
			testSet();
		});

		QUnit.start();

	});

}());
