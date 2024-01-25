import { Database } from "./database.js";
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js";
import { formatCSV } from "./utils/format-csv.js";

export const tasksFile = new URL('../tasks.csv', import.meta.url)

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.query

      const tasks = database.select('tasks', title || description ? {
        title,
        description,
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: async (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (title && title !== '' &&
          description && description !== '') {
            database.update('tasks', { title, description }, id)
            
            return res.writeHead(204).end()
          }
      
      return res.writeHead(404).end('Necessário o envio de um título e descrição')
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { completed_at } = req.body

      database.updateCompleted('tasks', id, { completed_at })
      
      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]