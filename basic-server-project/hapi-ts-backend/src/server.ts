'use strict'

import { Server, Request, ResponseToolkit } from '@hapi/hapi'

const init = async () => {
  // Create server on port 8082
  const server: Server = new Server({
    port: 8082,
    host: 'localhost'
  })

  // Root URI Call
  server.route({
    method: 'GET',
    path: '/',
    handler: (request: Request, h: ResponseToolkit) => {
      return h.response(`Welcome to the cloud!`).code(200)
    }
  })

  // Get a greeting to a specific person
  // to demonstrate request params
  // > try it {{host}}/persons/:the_name
  server.route({
    method: 'GET',
    path: '/persons/{name?}',
    handler: function (request, h) {
      const name = request.params.name ? request.params.name : 'stranger'

      if (request.params.name) {
        return h.response(`Welcome to the cloud, ${name}!`).code(200)
      } else {
        return h.response(`Your name is required, stranger.`).code(400)
      }
    }
  })

  // Get a greeting to a specific person
  // to demonstrate querying a request
  // > try it {{host}}/persons?name=the_name
  server.route({
    method: 'GET',
    path: '/persons/',
    handler: function (request, h) {

      return request.query

    }
  })

  // Post a greeting to a specific person
  server.route({
    method: 'POST',
    path: '/persons',
    handler: (request, h) => {
      // @TODO
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
