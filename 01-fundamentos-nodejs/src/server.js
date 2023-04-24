// CommonJS => require()
// EsNodule => import/export
import http from "node:http";
import { Transform } from "node:stream";
import { randomUUID } from "node:crypto";

import dotenv from 'dotenv';
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

dotenv.config();

const port = process.env.PORT;
const database = new Database();

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const inverted = number * -1;
    
    console.log(inverted)
    callback(null, Buffer.from(String(inverted)));
  }
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if(method === 'POST' && url === '/users') {
    const {name, email} = req.body;
    if(name === '' || email === '') {
      return res.writeHead(400).end("Missing body with email and name.");
    }

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user);

    return res.writeHead(201).end();
  }

  if(method === 'GET' && url === '/users') {
    const users = database.select('users');

    return res.end(JSON.stringify(users))
  }

  return res.end(body);
})

server.listen(port, (() => {
  console.log(`Server running in http://localhost:${port}`)
}))