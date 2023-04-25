import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = database.select('users');

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
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
  }
]