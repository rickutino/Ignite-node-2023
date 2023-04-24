import fastify from 'fastify'

const server = fastify()

server.get('/hello', () => {
  return 'Hello world'
})

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running!')
})
