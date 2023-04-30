// CommonJS => require()
// EsNodule => import/export
import http from "node:http";
import { Transform } from "node:stream";

import dotenv from 'dotenv';
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

dotenv.config();

const port = process.env.PORT;

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const inverted = number * -1;

    callback(null, Buffer.from(String(inverted)));
  }
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  
  await json(req, res)
  
  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const routeParams = req.url.match(route.path)
    const {query, ...params} = routeParams.groups
    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req,res)
  }

  return res.writeHead(404).end()
})

server.listen(port, (() => {
  console.log(`Server running in http://localhost:${port}`)
}))