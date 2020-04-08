import { Server, Request, ResponseToolkit } from '@hapi/hapi';

const init = async () => {

    // Create server on port 8082
    const server: Server = new Server({
        port: 8082,
        host: 'localhost',
    });

    // Root URI Call
    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit) => {
            return 'Welcome to the cloud!';
        }
    });

    // Get a greeting to a specific person
    // to demonstrate request.params
    // > try it {{host}}/persons/:the_name
    server.route({
        method: 'GET',
        path: '/persons/{name?}',
        handler: function (request, h) {

            const name = request.params.name ? request.params.name : 'stranger';

            if (request.params.name) {
                return `Welcome to the cloud, ${name}!`
            } else {
                return 'Your name is required, stranger.'
            }
        }
    });

    // Get a greeting to a specific person
    // to demonstrate request.query
    // > try it {{host}}/persons?name=the_name
    server.route({
        method: 'GET',
        path: '/persons/',
        handler: function (request, h) {

            // @TODO
        }

    });

    // Post a greeting to a specific person
    server.route({
        method: 'POST',
        path: '/persons',
        handler: function (request, h) {

        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
