const Hapi = require('@hapi/hapi');

const init = async () => {
	
	// Create an hapi server
	// on default port 3000
	const server = Hapi.server({
		port: 3000,
		host: 'localhost'
	});
	
	// Root URI call
	server.route({
		path: '/',
		method: 'GET',
		handler: (request, h) => {
			return 'Welcome to the Cloud!';
		}
	});
	
	// Get a greeting to a specific person
	// to demonstrate routing parameters
	// > try it {{host}}/persons/:the_name
	server.route({
		path: '/persons/{name}',
		method: 'GET',
		handler: function (request, h) {
			
			const name = request.params.name;
			return 'Hello ' + name
		}
	});
	
	// Get a greeting to a specific person to demonstrate req.query
	// > try it {{host}}/persons?name=the_name
	server.route({
		path: '/persons/',
		method: 'GET',
		handler: function (request, h) {
			
		}
	});
	
	// Post a greeting to a specific person
	// to demonstrate req.body
	// > try it by posting {"name": "the_name" } as
	// an application/json body to {{host}}/persons
	server.route({
		path: '/persons',
		method: 'POST',
		handler: function (request, h) {
			
			const name = request.payload.name // request.payload object is readily available compared to app.use(bodyParser.json())
			return `Welcome to the Cloud, ` + name;
		}
	});
	
	// Start server
	await server.start();
	console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();