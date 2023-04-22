// CommonJS => require()
// EsNodule => import/export
import http from "node:http";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const server = http.createServer((req, res) => {
  return res.end("Hello world")
})

server.listen(port, (() => {
  console.log(`Server running in http://localhost:${port}`)
}))