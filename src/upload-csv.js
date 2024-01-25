import { formatCSV } from "./utils/format-csv.js"

export const uploadCSV = async () => {
  const tasksFromCSV = await formatCSV()
      
    tasksFromCSV.forEach(async (task) => {
      await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
    })
}