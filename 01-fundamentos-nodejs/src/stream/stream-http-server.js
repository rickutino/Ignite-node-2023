import http from 'http'

const server = http.createServer((req, res) => {
  req.on('data', (chunk) => {
    console.log(chunk.toString())
  })

  req.on('end', () => {
    res.end('ok')
  })
})

server.listen(3334, () => {
  console.log('Server running at http://localhost:3334')
})
