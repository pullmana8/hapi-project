import { Server, Request, ResponseToolkit } from '@hapi/hapi';

const init = async () => {
    
    // Create server on port 3000
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });

    // Get route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit) => {
            return 'Welcome to the cloud!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
