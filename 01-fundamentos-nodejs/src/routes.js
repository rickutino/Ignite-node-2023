import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query
      const users = database.select('users', search ? {
        name: search,
        email: search
      }: null);

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
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
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const {name, email} = req.body;
      if(name === '' || email === '') {
        return res.writeHead(400).end("Missing body with email and name.");
      }
  
      const updatedUser = database.update('users', id, name, email);
  
      if(updatedUser === -1) {
        return res.writeHead(400).end("User not found.");
      }
      return res.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      
      const deletedUser = database.delete('users', id)
      if(deletedUser === -1) {
        return res.writeHead(400).end("User not found.");
      }

      return res.writeHead(204).end()
    }
  },
]