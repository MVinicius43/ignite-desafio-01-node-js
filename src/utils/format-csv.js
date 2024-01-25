import fs from 'node:fs'
import { parse } from 'csv-parse'
import { tasksFile } from '../routes.js'

export const formatCSV = async () => {
  const tasks = []
  const parser = fs
    .createReadStream(tasksFile)
    .pipe(parse({ delimiter: ",", from_line: 2 }))

  for await (const task of parser) {
    tasks.push(task)
  }

  const formatTasksList = tasks.map((task) => {
    return {
      title: task[0],
      description: task[1],
    }
  })

  return formatTasksList
}