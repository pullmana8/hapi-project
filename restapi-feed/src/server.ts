'use strict'

import * as Hapi from '@hapi/hapi'
import { config } from './config/config'

const c = config.dev

const init = async () => {
    // Create a server on port 8082
    const server: Hapi.Server = new Hapi.Server({
        port: process.env.PORT || 8082,
        host: 'localhost',
        routes: {
            cors: {
                // CORS should be restricted
                origin: ['*'],
                headers: [
                    'Authorization',
                    'Accept',
                    'Content-Type',
                    'X-Requested-With',
                    'Origin',
                ],
            },
        },
    })

    await server.start()
    console.log('Server running on %s', server.info.uri)
    console.log(`Press CTL+C to stop server`)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()

module.exports = Server